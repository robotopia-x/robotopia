const _ = require('lodash')
const entites = require('./entities')

const MAX_TRIES = 100

function initializeResourceSpots (state, { numberOfSpots, value, chunks, color }, send) {
  const { tiles } = state
  const mapHeight = tiles.length
  const mapWidth = tiles[0].length

  let resourceSpots = []

  for (let i = 0; i < numberOfSpots; i++) {
    let x, y, tries = 0;

    // search for empty random dirt spot
    do {
      tries += 1;
      x = _.random(0, mapWidth - 1)
      y = _.random(0, mapHeight - 1)
    } while ((tiles[y][x] !== 2 || getMinDistance(x, y, resourceSpots) < 5) && tries < MAX_TRIES)

    if (tries < MAX_TRIES) {
      resourceSpots.push({x, y})
    } else {
      i = 0
      resourceSpots = []
    }
  }

  _.forEach(resourceSpots, ({x, y}) => {
    send('game:createEntity', { data: entites.gem({ x, y, value, chunks, color }) }, _.noop)
  })

}

function getMinDistance(x, y, resourcePlaces) {
  return _.reduce(resourcePlaces, (minDistance, resource) =>  {
    const currentDistance = Math.sqrt(Math.pow(resource.x - x, 2) + Math.pow(resource.y - y, 2));

    if (currentDistance < minDistance) {
      return currentDistance
    }

    return minDistance

  }, Infinity)
}

module.exports = {
  initializeResourceSpots
}
