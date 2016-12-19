const _ = require('lodash')
const clock = require('./utils/clock')
const robotRuntime = require('./utils/robot-runtime')
const robotApi = require('./utils/robot-api')

module.exports = {
  clock: (send) => {
    clock.onTick(() => {
      send('stepRobotRuntime', _.noop)
    })
  },

  robotRuntime: (send) => {
    robotRuntime.connect(send)
    robotRuntime.createRobot({
      id: 'robot',
      api: robotApi,
      code: ''
    })
  }
}
