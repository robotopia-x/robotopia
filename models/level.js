const _ = require('lodash')
const update = require('immutability-helper')
const tutorials = require('./game/tutorials')

module.exports = {
  namespace: 'level',

  state: {
    level: 0
  },

  reducers: {
    _setLevel: (state, { level }) => {
      return update(state, {
        level: { $set: level }
      })
    }
  },

  effects: {
    loadLevel: (state, { level }, send) => {
      send('level:_setLevel', { level: level }, _.noop)
      send('game:loadGameState', { loadState: tutorials[level] }, _.noop)
    },
    resetLevel: (state, data, send) => {
      send('game:loadGameState', { loadState: tutorials[state.level] }, _.noop)
    },
    nextLevel: (state, data, send) => {
      if (state.level < (_.size(tutorials) - 1)) {
        send('level:loadLevel', { level: state.level + 1 }, _.noop)
      }
    },
    prevLevel: (state, data, send) => {
      if (state.level > 0) {
        send('level:loadLevel', { level: state.level - 1 }, _.noop)
      }
    }
  }
}
