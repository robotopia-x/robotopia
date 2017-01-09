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
      addResources: (state, { teamId, amount }, send) => {
        console.log(state)

        send('game:resourceStore._setResource', {
          teamId: teamId,
          amount: getTeamResources(state, teamId) + amount
        }, _.noop)

        console.log(state)
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
