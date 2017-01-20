const _ = require('lodash')
const { getTeamResources, getTeamGamePoints } = require('../../lib/game')

function addResources (state, { teamId, amount }, send) {
  send('game:setResource', {
    teamId: teamId,
    amount: getTeamResources(state, teamId) + amount
  }, _.noop)
}

function removeResources (state, { teamId, amount }, send) {
  send('game:setResource', {
    teamId: teamId,
    amount: _.clamp(getTeamResources(state, teamId) - amount, 0, 10000)
  }, _.noop)
}

function increaseGamePoints (state, { teamId, amount }, send) {
  send('game:setGamePoints', {
    teamId: teamId,
    amount: getTeamGamePoints(state, teamId) + amount
  }, _.noop)
}

function decreaseGamePoints (state, { teamId, amount }, send) {
  send('game:setGamePoints', {
    teamId: teamId,
    amount: getTeamGamePoints(state, teamId) - amount
  }, _.noop)
}

module.exports = {
  addResources,
  removeResources,
  increaseGamePoints,
  decreaseGamePoints
}
