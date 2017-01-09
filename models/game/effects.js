const _ =require('lodash')

function addResources (state, { teamId, amount }, game, send) {
  send('setResource', {
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

function getTeamResources (state, teamId) {
  return _.get(state, teamId, 0)
}

function hasTeamResource (state, teamId, amount) {
  return _.get(state, teamId, 0) >= amount
}

module.exports = {
  addResources,
  removeResources
}
