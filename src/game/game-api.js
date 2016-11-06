const _ = require('lodash')
const { updateEntity } = require('./game-engine')
const { MOVE } = require('../utils/types')

const GAME_SIZE = 10

module.exports = {
  actions: {
    move: _.partial(updateEntity, ['position'], (direction, { position }) => {
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
          x: _.clamp(nextX, 0, GAME_SIZE - 1),
          y: _.clamp(nextY, 0, GAME_SIZE - 1)
        }
      }
    }),

    rotate: _.partial(updateEntity, ['position', 'sprite'], (direction, { position }) => {
      const orientation = mod((position.rotation + direction), 4)

      return {
        position: {
          rotation: orientation
        },
        sprite: { type: `ROBOT_${orientation}` }
      }
    })
  }
}

function applyRotation (direction, rotation) {
  return mod((direction + rotation), 4)
}

function mod (x, n) {
  return ((x % n) + n) % n
}
