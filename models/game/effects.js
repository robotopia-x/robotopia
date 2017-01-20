const _ = require('lodash')

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

// TODO: move these to other, more appropriate place
function getTeamResources ({ resources }, teamId) {
  return _.get(resources, teamId, 0)
}

function getTeamGamePoints ({ gamePoints }, teamId) {
  return _.get(gamePoints, teamId, 0)
}

module.exports = {
  addResources,
  removeResources,
  increaseGamePoints,
  decreaseGamePoints
}
