const aStar = require('easystarjs')
const easystar = new aStar.js()
const grid = require('../game/initial-state').tiles

setup(grid, [1])

function setup (grid, allowedTiles) {
  easystar.enableSync()
  easystar.setGrid(grid)
  easystar.setAcceptableTiles(allowedTiles)
}

function getPath (startPos, endPos) {
  let fullPath = []

  easystar.findPath(startPos.y, startPos.x, endPos.y, endPos.x, function (path) {
    if (path) {
      fullPath = path
    }
  })
  easystar.calculate()

  return fullPath
}

function getMovementCommand (currentPos, newPos) {
  if (currentPos.y < newPos.y) {
    return 'FORWARD'
  } else if (currentPos.y > newPos.y) {
    return 'BACKWARD'
  }

  if (currentPos.x < newPos.x) {
    return 'RIGHT'
  } else if (currentPos.x > newPos.x) {
    return 'LEFT'
  }
}

function getMovementCommands (startPos, endPos) {
  let wordPath = []
  const path = getPath(startPos, endPos)

  let currentPos = path[0]

  for (let step = 1; step < path.length; step++) {
    const newPos = path[step]

    wordPath.push(getMovementCommand(currentPos, newPos))
    currentPos = newPos
  }

  return wordPath
}

module.exports = {
  getMovementCommands
}
