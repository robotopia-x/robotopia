const _ = require('lodash')
const { getAllEntities } = require('@robotopia/choo-game')

module.exports = {
  discoverable: {

    reducers: {
      markAsDiscoveredByTeam: (state, { teamId }) => {
        return {
          discoverable: { discovererTeamIds: { [teamId]: { $set: true } } }
        }
      }
    },

    effects: {
      update: (state, data, game, send) => {
        const discoverers = getNewDiscoverersInRange(game, state)

        _.forEach(discoverers, (discoverer) => {
          send('game:discoverable.markAsDiscoveredByTeam', {
            target: state.id,
            data: {
              teamId: discoverer.team.id
            }
          }, _.noop)

          send('runtime:triggerEvent', {
            type: `discover ${state.discoverable.type}`,
            target: { id: discoverer.id },
            args: [ state ]
          }, _.noop)
        })
      }
    }
  }
}

// returns list of discoverers which are in range and whose teams hasn't discovered the discoverable yet
// only one representative for each team is returned if multiple discoverer 'see' discoverable at the same time
function getNewDiscoverersInRange (game, { position, discoverable, team }) {
  const discoverers = getAllEntities('discoverer', game)

  return _(discoverers)
  .filter((entity) => {
    // exclude any entitys of teams which have already discovered this
    if (discoverable.discovererTeamIds[entity.team.id]) {
      return false
    }

    // exclude any entitys of the same team as the discoverable
    if (team && team.id === entity.team.id) {
      return false
    }

    const distance = Math.sqrt(Math.pow(position.x - entity.position.x, 2) + Math.pow(position.y - entity.position.y, 2))
    return entity.discoverer.range >= distance
  })
  .uniqBy(({ team }) => team.id)
  .value()
}
