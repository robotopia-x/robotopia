const _ = require('lodash')
const { updateEntity } = require('../game/game-engine')

const GAME_SIZE = 10

module.exports = {
  actions: {
    move: _.partial(updateEntity, ['position'], (direction, { position }) => {
      let nextX = position.x
      let nextY = position.y

      switch (direction) {
        case 'UP':
          nextY = position.y - 1
          break
        case 'DOWN':
          nextY = position.y + 1
          break
        case 'LEFT':
          nextX = position.x - 1
          break
        case 'RIGHT':
          nextX = position.x + 1
          break
      }

      return {
        position: {
          x: _.clamp(nextX, 0, GAME_SIZE - 1),
          y: _.clamp(nextY, 0, GAME_SIZE - 1)
        }
      }
    })
  }
}
