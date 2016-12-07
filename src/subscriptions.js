const _ = require('lodash')
const clock = require('./utils/clock')
const robotRuntime = require('./utils/robot-runtime')

module.exports = [
  (send, done) => {
    clock.onTick(() => {
      send('stepRobotRuntime', _.noop)
    })
  },
  (send, done) => {
    robotRuntime.connect(send)
  }
]
