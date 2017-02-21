const _ = require('lodash')
const update = require('immutability-helper')
const levels = require('../../assets/tutorial')
// const levels = require('./levels')

let willStopOnNextTick = false

module.exports = {
  namespace: 'tutorial',

  state: {
    level: null,
    isStoryModalOpen: true,
    events: {}
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
    },

    _updateEvents: (state, events) => {
      return update(state, {
        events: { $set: events }
      })
    }
  },

  effects: {
    loadLevel: (state, { name }, send) => {
      if (!levels.hasOwnProperty(name)) return
      const level = levels[name]()

      if (level !== undefined) {
        send('tutorial:resetEvents', null, _.noop)
        send('tutorial:_setLevel', { level }, _.noop)
        send('game:loadGameState', { loadState: level.game }, _.noop)
        send('editor:update', { workspace: level.editor.workspace }, _.noop)
      }
    },

    resetEvents: (state, data, send) => {
      willStopOnNextTick = false
      send('tutorial:_updateEvents', {}, _.noop)
    },

    sendEvent: (state, event, send) => {
      const type = event.type
      if (!type) return state
      if (type === 'clock') return send('tutorial:_updateEvents', handleClockEvent(state.events, event, send), _.noop)
      if (type === 'levelWon') {
        willStopOnNextTick = true
        return
      }
    }
  }
}

function handleClockEvent (events, event, send) {
  if (!event.hasOwnProperty('operation')) return events
  if (event.operation === 'tick') {
    if (willStopOnNextTick) {
      send('clock:stop', null, _.noop)
      willStopOnNextTick = false
    }
    return update(events, {
      time: { $set: events.time + 1 }
    })
  }
  if (event.operation === 'set' && event.hasOwnProperty('value') && !isNaN(event.value)) {
    return update(events, {
      time: { $set: event.value }
    })
  }
}
