const _ = require('lodash')
const { updateEntity } = require('../game/game-engine')

const GAME_SIZE = 10

module.exports = {
  actions: {
    move: _.partial(updateEntity, 'position', (direction, { x, y }) => {
      let nextX = x
      let nextY = y
      
      switch (direction) {
        case 'UP':
          nextY = y - 1
          break
        case 'DOWN':
          nextY = y + 1
          break
        case 'LEFT':
          nextX = x - 1
          break
        case 'RIGHT':
          nextX = x + 1
          break
      }

      return {
        x: _.clamp(nextX, 0, GAME_SIZE - 1),
        y: _.clamp(nextY, 0, GAME_SIZE - 1)
      }
    })
  }
}
