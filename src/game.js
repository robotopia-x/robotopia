const _ = require('lodash')
const game = require('./game/game-engine')
const { MOVE } = require('./utils/types')

const GAME_SIZE = 10

const initialState = {
  tiles: [
    [2, 1, 2, 3, 2, 0, 0, 0, 0, 0],
    [2, 1, 2, 1, 2, 0, 0, 0, 0, 0],
    [2, 1, 2, 1, 2, 0, 0, 0, 0, 0],
    [2, 1, 1, 1, 2, 0, 0, 0, 0, 0],
    [2, 2, 2, 1, 2, 0, 0, 0, 0, 0],
    [2, 2, 2, 1, 2, 2, 2, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 2, 0, 0, 0],
    [1, 2, 2, 1, 2, 1, 2, 0, 0, 0],
    [1, 2, 2, 1, 2, 1, 2, 2, 2, 0],
    [1, 2, 3, 1, 2, 1, 1, 3, 2, 0]
  ],
  entities: [
    getRobot({ id: 'robot', x: 1, y: 0 }),
    getGem({ x: 3, y: 0 }),
    getGem({ x: 7, y: 9 }),
    getGem({ x: 2, y: 9 })
  ]
}

function getRobot ({ id, x, y }) {
  return {
    id: 'robot',
    position: { x, y, rotation: 0 },
    sprite: { type: 'ROBOT_0' }
  }
}

function getGem ({ x, y }) {
  return {
    position: { x, y },
    item: { type: 'gem' },
    sprite: { type: 'GEM' }
  }
}

module.exports = game.engine({
  initialState,
  namespace: 'game',
  components: {
    robot: {
      requires: ['position', 'sprite'],
      reducers: {
        move: ({ direction }, state) => {
          const { position } = state
          let nextX = position.x
          let nextY = position.y
          let rotatedDirection = applyRotation(direction, position.rotation)

          switch (rotatedDirection) {
            case MOVE.BACKWARD:
              nextY = position.y - 1
              break
            case MOVE.FORWARD:
              nextY = position.y + 1
              break
            case MOVE.LEFT:
              nextX = position.x - 1
              break
            case MOVE.RIGHT:
              nextX = position.x + 1
              break
          }

          return {
            position: {
              x: { $set: _.clamp(nextX, 0, GAME_SIZE - 1) },
              y: { $set: _.clamp(nextY, 0, GAME_SIZE - 1) }
            }
          }
        },

        rotate: ({ direction }, state) => {
          const { position } = state
          const orientation = mod(position.rotation + direction, 4)

          return {
            position: {
              rotation: { $set: orientation }
            },
            sprite: {
              type: { $set: `ROBOT_${orientation}` }
            }
          }
        }
      }
    }
  }
})

function applyRotation (direction, rotation) {
  return mod((direction + rotation), 4)
}

function mod (x, n) {
  return ((x % n) + n) % n
}

