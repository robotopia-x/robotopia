const _ = require('lodash')
const { MOVE } = require('../../utils/types')

const GAME_SIZE = 10


module.exports = {
  movable: {
    requires: ['position'],

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
          }
        }
      }
    }
  }
}

function applyRotation (direction, rotation) {
  return mod((direction + rotation), 4)
}

function mod (x, n) {
  return ((x % n) + n) % n
}
