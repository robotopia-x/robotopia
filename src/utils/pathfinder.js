const aStar = require('easystarjs')
const easystar = new aStar.js()

easystar.enableSync()

function setup (grid, allowedTiles) {
  easystar.setGrid(board)
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
    return 'move(FORWARD)\n'
  } else if (currentPos.y > newPos.y) {
    return 'move(BACKWARD)\n'
  }

  if (currentPos.x < newPos.x) {
    return 'move(RIGHT)\n'
  } else if (currentPos.x > newPos.x) {
    return 'move(LEFT)\n'
  }

}

function getMovementCommands (startPos, endPos) {
  let commandStack = ''
  const path = getPath(startPos, endPos)

  let currentPos = path[0]

  for (let step = 1; step < path.length; step++) {
    const newPos = path[step]

    commandStack += getMovementCommand(currentPos, newPos)
    currentPos = newPos
  }

  return commandStack
}

module.exports = {
  getMovementCommands
}
