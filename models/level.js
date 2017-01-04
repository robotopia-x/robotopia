const _ = require('lodash')
const update = require('immutability-helper')
const tutorials = require('./game/tutorials')

module.exports = {
  namespace: 'level',

  state: {
    level: 0,
    goals: {}
  },

  reducers: {
    _setLevel: (state, { level, goals }) => {
      return update(state, {
        level: { $set: level },
        goals: { $set: goals}
      })
    }
  },

  effects: {
    loadLevel: (state, { level }, send) => {
      send('level:_setLevel', { level: level, goals: tutorials[level].goals }, _.noop)
      send('game:loadGameState', { loadState: tutorials[level].state }, _.noop)
      send('updateWorkspace', { workspace: tutorials[level].workspace }, _.noop)
      send('updateToolbox', { toolbox: tutorials[level].toolbox }, _.noop)
    },
    resetLevel: (state, data, send) => {
      send('game:loadGameState', { loadState: tutorials[state.level].state }, _.noop)
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
