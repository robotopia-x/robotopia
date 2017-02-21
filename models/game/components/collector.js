const _ = require('lodash')

module.exports = {
  collector: {
    requires: ['position'],

    reducers: {
      _setHasResource: (state, { hasResource, chunk }) => {
        return {
          collector: { hasResource: { $set: hasResource }, chunk: { $set: chunk } }
        }
      }
    },

    effects: {
      collectResource: (state, data, game, send) => {
        const hasResource = state.collector.hasResource
        const nearResource = getNearResource(state, game)

        if (!hasResource && nearResource) {
          const resourceChunk = nearResource.collectable.chunks

          send('game:collector._setHasResource', {
            target: state.id,
            data: { hasResource: true, chunk: resourceChunk }
          }, _.noop)
          send('game:collectable.decreaseResource', {
            target: state.id,
            data: { amount: resourceChunk }
          }, _.noop)
        }
      },

      depositResource: (state, data, game, send) => {
        const hasResource = state.collector.hasResource
        const resourceChunk = state.collector.chunk

        if (hasResource && isOnBase(state, game)) {
          send('game:addResources', { teamId: state.team.id, amount: resourceChunk }, _.noop)
          send('game:collector._setHasResource', {
            target: state.id,
            data: { hasResource: false, chunk: resourceChunk }
          }, _.noop)
        }
      }
    }
  }
}

function getNearResource ({ position }, { entities }) {
  const resources = _.filter(entities, 'collectable')

  return _.find(resources, (resource) => {
    const distance = Math.abs(resource.position.x - position.x) + Math.abs(resource.position.y - position.y)
    return distance <= 1
  })
}

function isOnBase ({ position, team }, { entities }) {
  const teamBase = _(entities)
    .filter('robotSpawner')
    .find({ team: { id: team.id } })

  return teamBase.position.x === position.x && teamBase.position.y === position.y
}
