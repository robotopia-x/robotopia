const { AStarFinder, Grid } = require('pathfinding')
const initalState = require('../game/initial-state')
const { ORIENTATION } = require('./types')

const finder = new AStarFinder()

function getGrid (state) {
  const { tiles } = state

  const width = tiles[0].length
  const height = tiles.length
  const grid = new Grid(width, height)

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      if (tiles[y][x] === 0) {
        grid.setWalkableAt(x, y, false)
      }
    }
  }

  return grid
}

function getPath (startPos, endPos) {
  const grid = getGrid(initalState)
  return finder.findPath(startPos.x, startPos.y, endPos.x, endPos.y, grid)
}

function getMovementCommand ([currentX, currentY], [nextX, nextY]) {
  if (currentY < nextY) {
    return ORIENTATION.FRONT
  } else if (currentY > nextY) {
    return ORIENTATION.BACK
  }

  if (currentX < nextX) {
    return ORIENTATION.RIGHT
  } else if (currentX > nextX) {
    return ORIENTATION.LEFT
  }
}

function getMovementCommands (startPos, endPos) {
  const commands = []
  const path = getPath({ x: startPos.x, y: startPos.y }, { x: endPos.x, y: endPos.y })
  let currentPos = path[0]

  for (let step = 1; step < path.length; step += 1) {
    const nextPos = path[step]

    commands.push(getMovementCommand(currentPos, nextPos))
    currentPos = nextPos
  }

  return commands
}

module.exports = {
  getMovementCommands
}
