const _ = require('lodash')
const update = require('immutability-helper')
const uid = require('uid')

function init (state) {
  return _.assign(
    {},
    state,
    {
      entities: _.reduce(state.entities, (entities, entity) => {
        const entityWithId = createEntity(entity)
        entities[entityWithId.id] = entityWithId
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
  return _.filter(state.entities, (entity) => hasEntityComponents(componentTypes, entity))
}

function hasEntityComponents (componentTypes, entity) {
  return _.every(componentTypes, (type) => !_.isUndefined(entity))
}

const gameAPI = {
  reducers: {
    createEntity: (state, { data }) => {
      const entity = createEntity(data)

      return update(state, {
        entities: {
          [entity.id]: { $set: entity }
        }
      })
    },
    deleteEntity: (state, { data }) => {
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
  return getComponentsActionHandlers('reducers', components, executeReducerAction)
}

function getComponentsEffects (components) {
  return getComponentsActionHandlers('effects', components, executeEffectAction)
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
function getComponentsActionHandlers (actionType, components, executeAction) {
  return _.reduce(components, (handlers, component, componentType) => {
    return _.reduce(component[actionType], (handlers, actionHandler, reducerName) => {
      handlers[`${componentType}.${reducerName}`] = _.partial(executeAction, componentType, actionHandler)
      return handlers
    }, handlers)
  }, {})
}

function executeReducerAction (componentType, actionHandler, state, { target, data }) {
  let entitiyChanges

  if (target) {
    entitiyChanges = getSingleEntityChanges(actionHandler, target, state, data)
  } else {
    entitiyChanges = getAllEntitiesChanges(actionHandler, componentType, state, data)
  }

  return update(state, { entities: entitiyChanges })
}

function getSingleEntityChanges (actionHandler, id, state, action) {
  const current = getEntity(id, state)
  const nextChanges = actionHandler(current, action, state)

  return {
    [id]: nextChanges
  }
}

function getAllEntitiesChanges (actionHandler, componentType, state, action) {
  const entities = getAllEntities([componentType], state)

  return _.reduce((entityChanges, entity) => {
    const next = actionHandler(entity, action, state)

    entityChanges[entity.id] = _.mapValues(next, (component) => ({ $set: component }))

    return entityChanges
  }, entities, {})
}

function executeEffectAction (componentType, actionHandler, state, { target, data }, send, done) {
  if (target) {
    const entity = getEntity(target, state)
    return actionHandler(entity, data, state, send, done)
  }

  const entites = getAllEntities(componentType, state)
  _.forEach(entites, (entity) => {
    actionHandler(entity, data, state, send, done)
  })
}

module.exports = {
  engine: game,
  getEntity,
  getAllEntities
}
