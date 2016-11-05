const _ = require('lodash')
const update = require('immutability-helper')
const uid = require('uid')

function init ({ tiles, entities }) {
  return {
    tiles,
    entities: _.reduce(entities, (entities, { id = uid(), components }) => {
      entities[id] = { id, components }
      return entities
    }, {})
  }
}

function addEntity (state, { components, id = uid() }) {
  return update(state, {
    entities: { [id]: { $set: { components, id } } }
  })
}

function updateEntity (state, id, type, updateComponent) {
  const componentState = state.entities[id].components[type]

  return update(state, {
    entities: { [id]: { components: { [type]: { $set: updateComponent(componentState) } } } }
  })
}

function getAllEntities (state, type) {
  return _(state.entities)
    .filter(({ components }) => components[type])
    .map(({ id, components }) => ({ id, [type]: components[type] }))
    .value()
}

module.exports = {
  init,
  addEntity,
  getAllEntities,
  updateEntity
}
