const _ = require('lodash')
const update = require('immutability-helper')
const Clock = require('../lib/time/clock')

function create () {
  let tickCallback = _.noop
  const clock = new Clock()

  const model = {
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
          send('clock:setProgress', { progress: 0 }, _.noop)
          tickCallback(send)
        })

        clock.onProgress((progress) => send('clock:setProgress', { progress }, _.noop))
      }
    }
  }

  return {
    model,
    onTick: (callback) => { tickCallback = callback }
  }
}

module.exports = {
  create
}

