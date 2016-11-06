const gameEngine = require('./game-engine')

module.exports = gameEngine.init({
  tiles: [
    [0, 2, 1, 2, 3, 2, 0, 0, 0, 0],
    [0, 2, 1, 2, 1, 2, 0, 0, 0, 0],
    [0, 2, 1, 2, 1, 2, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
    [0, 2, 2, 2, 1, 2, 0, 0, 0, 0],
    [2, 2, 2, 2, 1, 2, 2, 2, 0, 0],
    [2, 1, 1, 1, 1, 1, 1, 2, 0, 0],
    [2, 1, 2, 2, 1, 2, 1, 2, 0, 0],
    [2, 1, 2, 2, 1, 2, 1, 2, 2, 2],
    [2, 1, 2, 3, 1, 2, 1, 1, 3, 2]
  ],
  entities: [
    getRobot({ id: 'robot', x: 2, y: 0 }),
    getGem({ x: 4, y: 0 }),
    getGem({ x: 8, y: 9 }),
    getGem({ x: 3, y: 9 })
  ]
})

function getRobot ({ id, x, y }) {
  return {
    id: 'robot',
    position: { x, y },
    sprite: { type: 'ROBOT' }
  }
}

function getGem ({x, y}) {
  return {
    position: { x, y },
    item: { type: 'gem' },
    sprite: { type: 'GEM' }
  }
}
