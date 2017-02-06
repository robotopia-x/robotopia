const _ = require('lodash')
const { AStarFinder, Grid } = require('pathfinding')
const { getAllEntities } = require('./game')

const finder = new AStarFinder()

function getGrid (game) {
  const { tiles } = game

  const width = tiles[0].length
  const height = tiles.length
  const grid = new Grid(width, height)

  for (let x = 0; x < width; x += 1) {
    for (let y = 0; y < height; y += 1) {
      if (tiles[y][x] === 1) {
        grid.setWalkableAt(x, y, false)
      }
    }
  }

  _.forEach(getAllEntities('collides', game), ({ position }) => grid.setWalkableAt(position.x, position.y, false))

  return grid
}

function getPath (game, startPos, endPos) {
  const grid = getGrid(game)
  const path = finder.findPath(startPos.x, startPos.y, endPos.x, endPos.y, grid)

  return _.map(path, ([x, y]) => ({ x, y }))
}

module.exports = {
  getPath
}
