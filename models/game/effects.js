const _ = require('lodash')
const entites = require('./entities')
const { getTeamResources, getTeamGamePoints, isFieldEmpty } = require('../../lib/game')

function initializeResourceSpots (state, { numberOfSpots }, send) {
  const { tiles } = state
  const mapHeight = tiles.length
  const mapWidth = tiles[0].length

  const resourcePlaces = {}

  _.times(numberOfSpots, () => {
    let x, y

    // search for empty random dirt spot
    do {
      x = _.random(0, mapWidth - 1)
      y = _.random(0, mapHeight - 1)
    } while (tiles[y][x] !== 2 || resourcePlaces[`${x},${y}`] === true)

    resourcePlaces[`${x},${y}`] = true

    send('game:createEntity', { data: entites.gem({ x, y }) }, _.noop)
  })
}

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
  initializeResourceSpots,
  addResources,
  removeResources,
  increaseGamePoints,
  decreaseGamePoints
}
