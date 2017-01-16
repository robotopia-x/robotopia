const _ = require('lodash')

const RESOURCE_AMOUNT = 10

module.exports = {
  collector: {
    requires: ['position'],

    reducers: {
      _setHasResource: (state, { hasResource }) => {
        return {
          collector: { hasResource: { $set: hasResource } }
        }
      }
    },

    effects: {
      collectResource: (state, data, game, send) => {
        const hasResource = state.collector.hasResource

        if (!hasResource && isOnResource(state, game)) {
          send('game:collector._setHasResource', {
            target: state.id,
            data: { hasResource: true }
          }, _.noop)
        }
      },

      depositResource: (state, data, game, send) => {
        const hasResource = state.collector.hasResource

        if (hasResource && isOnBase(state, game)) {
          send('game:addResources', { teamId: state.team.id, amount: RESOURCE_AMOUNT }, _.noop)
          send('game:collector._setHasResource', {
            target: state.id,
            data: { hasResource: false }
          }, _.noop)
        }
      }
    }
  }
}

function isOnResource ({ position }, { entities }) {
  const resources = _.filter(entities, 'collectable')

  return _.find(resources, { position: { x: position.x, y: position.y } })
}

function isOnBase ({ position, team }, { entities }) {
  const teamBase = _(entities)
                  .filter('robotSpawner')
                  .find({ team: { id: team.id } })

  return _.isEqual(teamBase.position, { x: position.x, y: position.y })
}
