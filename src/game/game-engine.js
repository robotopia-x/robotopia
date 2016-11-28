const _ = require('lodash')
const update = require('immutability-helper')
const uid = require('uid')

function init ({ tiles, entities }) {
  return {
    tiles,
    entities: _.reduce(entities, (entities, entity) => {
      if (!entity.id) {
        entity.id = uid()
      }
      entities[entity.id] = entity
      return entities
    }, {})
  }
}

function getEntity (id, componentTypes, state) {
  return getEntityComponents(componentTypes, state.entities[id])
}

function getAllEntities (componentTypes, state) {
  return _(state.entities)
    .filter(entity => hasEntityComponents(componentTypes, entity))
    .map(entity => getEntityComponents(componentTypes, entity))
    .value()
}

function hasEntityComponents (componentTypes, entity) {
  return _.every(componentTypes, (type) => !_.isUndefined(entity))
}

function getEntityComponents (componentTypes, entity) {
  return _.pick(entity, ['id'].concat(componentTypes))
}

function game ({ namespace, initialState, components }) {
  const reducers = getComponentsReducers(components)

  return {
    namespace,
    state: init(initialState),
    reducers
  }
}

function getComponentsReducers (components) {
  return _.reduce(components, (gameReducers, component, componentType) => {
    return _.reduce(component.reducers, (gameReducers, reducer, reducerName) => {
      gameReducers[`${componentType}.${reducerName}`] = _.partial(executeAction, component.requires, reducer)
      console.log('component:', reducerName, gameReducers)
      return gameReducers
    }, gameReducers)
  }, {})
}

function executeAction (componentTypes, reducer, { target, data }, state) {
  let entitiyChanges

  if (target) {
    entitiyChanges = getSingleEntityChanges(componentTypes, reducer, target, data, state)
  } else {
    entitiyChanges = getAllEntitiesChanges(componentTypes, reducer, data, state)
  }

  return update(state, { entities: entitiyChanges })
}

function getSingleEntityChanges (componentTypes, reducer, id, action, state) {
  const current = getEntity(id, componentTypes, state)
  const nextChanges = reducer(action, current)

  return {
    [id]: nextChanges
  }
}

function getAllEntitiesChanges (componentTypes, reducer, action, state) {
  const entities = getAllEntities(componentTypes, state)

  return _.reduce((entityChanges, entity) => {
    const next = reducer(action, entity)

    entityChanges[entity.id] = _.mapValues(next, (component) => ({ $set: component }))

    return entityChanges
  }, entities, {})
}

module.exports = {
  engine: game,
  getAllEntities
}
