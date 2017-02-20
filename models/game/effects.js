const _ = require('lodash')
const entites = require('./entities')

function initializeResourceSpots (state, { numberOfSpots, value }, send) {
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

    send('game:createEntity', { data: entites.gem({ x, y, value }) }, _.noop)
  })
}

module.exports = {
  initializeResourceSpots
}
