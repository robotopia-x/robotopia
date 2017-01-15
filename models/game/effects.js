const _ = require('lodash')

function addResources (state, { teamId, amount }, send) {
  send('game:setResource', {
    teamId: teamId,
    amount: getTeamResources(state, teamId) + amount
  }, _.noop)
}

function removeResources (state, { teamId, amount }, send) {
  send('setResource', {
    teamId: teamId,
    amount: _.clamp(getTeamResources(state, teamId) - amount, 0, 10000)
  }, _.noop)
}

// TODO: move these to other, more appropriate place
function getTeamResources ({ resources }, teamId) {
  return _.get(resources, teamId, 0)
}

function hasTeamResource ({ resources }, teamId, amount) {
  return _.get(resources, teamId, 0) >= amount
}

module.exports = {
  addResources,
  removeResources
}
