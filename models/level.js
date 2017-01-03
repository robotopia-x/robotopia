const _ = require('lodash')
const update = require('immutability-helper')
const tutorials = require('./game/tutorials')

module.exports = {
  namespace: 'level',

  state: {
    level: 1
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
      send('game:loadGameState', { loadState: tutorials[level].state }, _.noop)
    },
    nextLevel: (state, data, send) => {
      send('level:loadLevel', { level: state.level + 1 }, _.noop)
    },
    prevLevel: (state, data, send) => {
      if (state.level > 1) {
        send('level:loadLevel', { level: state.level - 1 }, _.noop)
      }
    }
  }
}
