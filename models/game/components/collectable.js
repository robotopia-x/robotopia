const _ = require('lodash')

module.exports = {
  collectable: {
    requires: ['position'],

    reducers: {
      _setResourceValue: (state, { value }) => {
        return {
          collectable: { value: { $set: value } }
        }
      }
    },

    effects: {
      decreaseResource: (state, { amount }, game, send) => {
        const resource = getNearResource(state.position, game.entities)

        if (resource && resource.collectable.value > amount) {
          send('game:collectable._setResourceValue', {
            target: resource.id,
            data: { value: resource.collectable.value - amount }
          }, _.noop)
        }

        if (resource && resource.collectable.value === amount) {
          send('game:deleteEntity', {
            data: { id: resource.id }
          }, _.noop)
        }
      }
    }
  }
}

function getNearResource (position, entitites) {
  const resources = _.filter(entitites, 'collectable')

  return _.find(resources, (resource) => {
    const distance = Math.abs(resource.position.x - position.x) + Math.abs(resource.position.y - position.y)
    return distance <= 1
  })
}
