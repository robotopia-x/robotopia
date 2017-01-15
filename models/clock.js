const _ = require('lodash')
const update = require('immutability-helper')
const Clock = require('../lib/time/clock')

module.exports = () => {
  let tickCallback = _.noop
  const clock = new Clock()

  const model = {
    namespace: 'clock',

    state: {
      progress: 0,
      isRunning: false,
      intervalDuration: clock.intervalDuration
    },

    reducers: {
      _setProgress: (state, { progress }) => {
        return update(state, {
          progress: { $set: progress }
        })
      },

      _setIsRunning: (state, { isRunning }) => {
        return update(state, {
          isRunning: { $set: isRunning }
        })
      },

      _setIntervalDuration: (state, { intervalDuration }) => {
        return update(state, {
          intervalDuration: { $set: intervalDuration }
        })
      }
    },

    effects: {
      start: (state, data, send) => {
        clock.start()
        send('clock:_setIsRunning', { isRunning: true }, _.noop)
      },
      stop: (state, data, send) => {
        clock.stop()
        send('clock:_setIsRunning', { isRunning: false }, _.noop)
      },

      setIntervalDuration: (state, { intervalDuration }, send) => {
        clock.setIntervalDuration(intervalDuration)
        send('clock:_setIntervalDuration', { intervalDuration }, _.noop)
      }
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
