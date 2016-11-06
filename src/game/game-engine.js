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

function updateEntity (types, updateComponents, { id, params }, state) {
  const current = getEntity(id, types, state)
  const next = updateComponents.apply(null, params.concat([current]))

  return update(state, {
    game: {
      entities: {
        [id]: _.reduce(next, (changes, component, type) => {
          changes[type] = { $set: _.assign({}, current[type], component) }
          return changes
        }, {})
      }
    }
  })
}

function getEntity (id, types, state) {
  return _.pick(state.game.entities[id], types)
}

function getAllEntities (types, state) {
  return _(state.entities)
    .filter(entity => hasEntityComponents(types, entity))
    .map(entity => getEntityComponents(types, entity))
    .value()
}

function hasEntityComponents (types, entity) {
  return _.every(types, (type) => !_.isUndefined(entity))
}

function getEntityComponents (types, entity) {
  return _.pick(entity, ['id'].concat(types))
}

module.exports = {
  init,
  updateEntity,
  getAllEntities
}
