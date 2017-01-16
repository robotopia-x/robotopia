const _ = require('lodash')
const update = require('immutability-helper')
const levels = require('./levels')

module.exports = {
  namespace: 'tutorial',

  state: {
    level: null,
    isStoryModalOpen: true
  },

  reducers: {
    _setLevel: (state, { level }) => {
      return update(state, {
        level: { $set: level },
        isStoryModalOpen: { $set: true }
      })
    },

    setDisplayStoryModal: (state, { open }) => {
      return update(state, {
        isStoryModalOpen: { $set: open }
      })
    }
  },

  effects: {
    loadLevel: (state, { name }, send) => {
      const level = levels[name]

      if (level !== undefined) {
        send('tutorial:_setLevel', { level }, _.noop)
        send('game:loadGameState', { loadState: level.game }, _.noop)
      }
    }
  }
}
