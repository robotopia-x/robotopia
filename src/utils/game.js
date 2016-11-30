const _ = require('lodash')
const update = require('immutability-helper')
const uid = require('uid')

function init (state) {
  const globalState = _.omit(state, ['entities'])

  return _.extend(
    globalState,
    {
      entities: _.reduce(state.entities, (entities, entity) => {
        if (!entity.id) {
          entity.id = uid()
        }

        // TODO: enforce component requirements

        entities[entity.id] = entity
        return entities
      }, {})
    }
  )
}

function getEntity (id, state) {
  return state.entities[id]
}

function getAllEntities (componentTypes, state) {
  return _(state.entities)
    .filter(entity => hasEntityComponents(componentTypes, entity))
    .value()
}

function hasEntityComponents (componentTypes, entity) {
  return _.every(componentTypes, (type) => !_.isUndefined(entity))
}

function game ({ namespace, state, components }) {
  const reducers = getComponentsReducers(components)

  return {
    namespace,
    state: init(state),
    reducers
  }
}

function getComponentsReducers (components) {
  return _.reduce(components, (gameReducers, component, componentType) => {
    return _.reduce(component.reducers, (gameReducers, reducer, reducerName) => {
      gameReducers[`${componentType}.${reducerName}`] = _.partial(executeAction, componentType, reducer)
      return gameReducers
    }, gameReducers)
  }, {})
}

function executeAction (componentType, reducer, { target, data }, state) {
  let entitiyChanges

  if (target) {
    entitiyChanges = getSingleEntityChanges(reducer, target, data, state)
  } else {
    entitiyChanges = getAllEntitiesChanges(reducer, componentType, data, state)
  }

  return update(state, { entities: entitiyChanges })
}

function getSingleEntityChanges (reducer, id, action, state) {
  const current = getEntity(id, state)
  const nextChanges = reducer(action, current, state)

  return {
    [id]: nextChanges
  }
}

function getAllEntitiesChanges (reducer, componentType, action, state) {
  const entities = getAllEntities([componentType], state)

  return _.reduce((entityChanges, entity) => {
    const next = reducer(action, entity, state)

    entityChanges[entity.id] = _.mapValues(next, (component) => ({ $set: component }))

    return entityChanges
  }, entities, {})
}

module.exports = {
  engine: game,
  getEntity,
  getAllEntities
}
