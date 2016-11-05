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

function updateEntity (updateComponent, type, data, state) {
  const componentState = state.entities[data.id].components[data.type]

  return update(state, {
    entities: {
      [data.id]: {
        components: {
          [type]: {
            $set: updateComponent.apply(null, data.params.concat([componentState]))
          }
        }
      }
    }
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