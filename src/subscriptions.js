const _ = require('lodash')
const clock = require('./utils/clock')
const robotRuntime = require('./utils/robot-runtime')

module.exports = {
  clock: (send, done) => {
    clock.onTick(() => {
      send('stepRobotRuntime', _.noop)
    })
  },

  robotRuntime: (send, done) => {
    robotRuntime.connect(send)
  }
}
