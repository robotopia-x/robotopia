const gameEngine = require('./game-engine')

module.exports = gameEngine.init({
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  entities: [
    getRobot({ id: 'robot', x: 1, y: 0 }),
    getGem({ x: 2, y: 0 }),
    getGem({ x: 5, y: 0 })
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
