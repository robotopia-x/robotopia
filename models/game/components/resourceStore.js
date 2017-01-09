const _ = require('lodash')

const MAX_RESOURCE_AMOUNT = 1000

module.exports = {
  resourceStore: {
    requires: ['team'],

    reducers: {
      _setResource: (state, { teamId, amount }) => {
        return {
          [teamId]: { $set: amount }
        }
      }
    },

    effects: {
      addResources: (state, data, game, send) => {
        console.log(state)
        console.log(data)

        send('game:resourceStore._setResource', {
          teamId: state.team.id,
          amount: getTeamResources(state, state.team.id) + amount
        }, _.noop)
      },
      removeResources: (state, { teamId, amount }, send) => {
        send('game:resourceStore._setResource', {
          teamId: teamId,
          amount: _.clamp(getTeamResources(state, teamId) - amount, 0, MAX_RESOURCE_AMOUNT)
        }, _.noop)
      }
    }
  }
}

function getTeamResources (state, teamId) {
  return _.get(state, teamId, 0)
}

function hasTeamResource (state, teamId, amount) {
  return _.get(state, teamId, 0) >= amount
}
