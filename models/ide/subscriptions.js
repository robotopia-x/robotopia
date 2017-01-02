const _ = require('lodash')
const clock = require('../../lib/utils/clock')
const robotRuntime = require('../../lib/utils/robot-runtime')
const robotApi = require('../../lib/utils/robot-api')

module.exports = {
  clock: (send) => {
    clock.onTick(() => {
      send('stepRobotRuntime', _.noop)
    })

    clock.onProgress((progress) => {
      send('game:setStepProgress', { progress }, _.noop)
    })
  },

  robotRuntime: (send) => {
    robotRuntime.connect(send)
    robotRuntime.createRobot({
      id: 'ROBOT',
      api: robotApi,
      code: ''
    })
  }
}
