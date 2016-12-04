const { ORIENTATION } = require('../utils/types')

module.exports = {
  tiles: [
    [0, 1, 1, 1, 3, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 3, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 3, 3, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 3, 0, 0],
    [1, 1, 0, 0, 1, 0, 1, 2, 0, 0],
    [2, 1, 2, 2, 2, 2, 1, 2, 2, 2],
    [2, 1, 2, 2, 2, 2, 1, 1, 3, 2]
  ],
  entities: [
    getRobot({ id: 'robot', x: 2, y: 0 }),
    getGem({ x: 4, y: 0 }),
    getGem({ x: 8, y: 9 }),
    getGem({ x: 3, y: 9 })
  ]
}

function getRobot ({ id, x, y }) {
  return {
    id,
    position: { x, y, rotation: 0 },
    renderer: {
      type: 'ROTATING',
      data: {
        sprites: {
          [ORIENTATION.FRONT]: 'ROBOT_FRONT',
          [ORIENTATION.BACK]: 'ROBOT_BACK',
          [ORIENTATION.LEFT]: 'ROBOT_LEFT',
          [ORIENTATION.RIGHT]: 'ROBOT_RIGHT'
        }
      }
    },
    movable: {}
  }
}

function getGem ({ x, y }) {
  return {
    position: { x, y },
    item: { type: 'gem' },
    renderer: {
      type: 'SIMPLE',
      data: {
        sprite: 'GEM'
      }
    }
  }
}
