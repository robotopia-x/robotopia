const _ = require('lodash')
const update = require('immutability-helper')
const Clock = require('../lib/time/clock')

function getModel () {
  const clock = new Clock()

  return {
    namespace: 'clock',

    state: {
      progress: 0
    },

    reducers: {
      setProgress: (state, { progress }) => {
        return update(state, {
          progress: { $set: progress }
        })
      }
    },

    effects: {
      start: () => clock.start(),
      stop: () => clock.stop(),
      setIntervalDuration: (state, { intervalDuration }) => clock.setIntervalDuration(intervalDuration)
    },

    subscriptions: {
      clock: (send) => {
        clock.onTick(() => {
          send('clock:setProgress', { progress: 0 })
          send('game:tick', {}, _.noop)
        })
        clock.onProgress((progress) => send('clock:setProgress', { progress }, _.noop))
      }
    }
  }
}

module.exports = {
  getModel
}

