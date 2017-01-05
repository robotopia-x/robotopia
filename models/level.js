const _ = require('lodash')
const update = require('immutability-helper')
const tutorials = require('./game/tutorials')

module.exports = {
  namespace: 'level',

  state: {
    level: 0,
    goals: {},
    displayStory: true,
    storyModal: ''
  },

  reducers: {
    _setLevel: (state, { level, goals, storyModal }) => {
      return update(state, {
        level: { $set: level },
        goals: { $set: goals },
        displayStory: { $set: true },
        storyModal: { $set: storyModal }
      })
    },
    _setDisplayStoryModal: (state, { displayStory }) => {
      return update(state, {
        displayStory: { $set: displayStory }
      })
    }
  },

  effects: {
    loadLevel: (state, { level }, send) => {
      send('level:_setLevel', {
        level: level,
        goals: tutorials[level].goals,
        storyModal: tutorials[level].storyModal
      }, _.noop)
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
    },
    closeStoryModal: (state, data, send) => {
      send('level:_setDisplayStoryModal', { displayStory: false }, _.noop)
    }
  }
}
