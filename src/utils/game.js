const _ = require('lodash')
const update = require('immutability-helper')
const uid = require('uid')

function init (state) {
  const globalState = _.omit(state, ['entities'])

  return _.extend(
    globalState,
    {
      entities: _.reduce(state.entities, (entities, entity) => {
        entities[entity.id] = createEntity(entity)
        return entities
      }, {})
    }
  )
}

function createEntity (entity) {
  if (!entity.id) {
    entity.id = uid()
  }

  // TODO: enforce component requirements

  return entity
}

function getEntity (id, state) {
  return state.entities[id]
}

function deleteEntity (id, state) {
  return _.omitBy(state.entities, (entitiy) => {
    return entitiy.id === id
  })
}

function getAllEntities (componentTypes, state) {
  return _(state.entities)
    .filter(entity => hasEntityComponents(componentTypes, entity))
    .value()
}

function hasEntityComponents (componentTypes, entity) {
  return _.every(componentTypes, (type) => !_.isUndefined(entity))
}

const gameAPI = {
  reducers: {
    createEntity: ({ data }, state) => {
      const entity = createEntity(data)

      return update(state, {
        entities: {
          [entity.id]: { $set: entity }
        }
      })
    },
    deleteEntity: ({ data }, state) => {
      return update(state, {
        entities: {
          $set: deleteEntity(data.id, state)
        }
      })
    }
  },
  effects: {}
}

function game ({ state, components, reducers, effects }) {
  // TODO: enforce that there are no components which have effects and reducers with the same name

  return {
    namespace: 'game',
    state: init(state),
    reducers: _.assign(
      {},
      getComponentsReducers(components),
      gameAPI.reducers,
      reducers
    ),
    effects: _.assign(
      {},
      getComponentsEffects(components),
      gameAPI.effects,
      effects
    )
  }
}

function getComponentsReducers (components) {
  return getComponentsActionHandlers('reducers', components)
}

function getComponentsEffects (components) {
  return getComponentsActionHandlers('effects', components)
}

/* getComponentsActionHandlers()

 Combines all action handler of all components of one type.
 There are two different action types in choo: reducers and effects

 handlers are prefixed with the name of the component so if we have two components A and B
 the returned handlers would look something like this

 {
 'A.handler1': function(),
 'A.handler2': function(),
 'B.handler3': function()
 }

 All handlers are wrapped so the action handler has only a view of the data of the entity

 */
function getComponentsActionHandlers (actionType, components) {
  return _.reduce(components, (handlers, component, componentType) => {
    return _.reduce(component[actionType], (handlers, actionHandler, reducerName) => {
      handlers[`${componentType}.${reducerName}`] = _.partial(executeAction, componentType, actionHandler)
      return handlers
    }, handlers)
  }, {})
}

function executeAction (componentType, actionHandler, { target, data }, state, send, done) {
  let entitiyChanges

  if (target) {
    entitiyChanges = getSingleEntityChanges(actionHandler, target, data, state, send, done)
  } else {
    entitiyChanges = getAllEntitiesChanges(actionHandler, componentType, data, state, send, done)
  }

  return update(state, { entities: entitiyChanges })
}

function getSingleEntityChanges (actionHandler, id, action, state, send, done) {
  const current = getEntity(id, state)
  const nextChanges = actionHandler(action, current, state, send, done)

  return {
    [id]: nextChanges
  }
}

function getAllEntitiesChanges (actionHandler, componentType, action, state, send, done) {
  const entities = getAllEntities([componentType], state)

  return _.reduce((entityChanges, entity) => {
    const next = actionHandler(action, entity, state, send, done)

    entityChanges[entity.id] = _.mapValues(next, (component) => ({ $set: component }))

    return entityChanges
  }, entities, {})
}

module.exports = {
  engine: game,
  getEntity,
  getAllEntities,
  getEntitiyFromPos
}
