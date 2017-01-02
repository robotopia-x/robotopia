const robotRuntime = require('../../lib/utils/robot-runtime')
const robotApi = require('../../lib/utils/robot-api')

module.exports = {
  robotRuntime: (send) => {
    robotRuntime.connect(send)
    robotRuntime.createRobot({
      id: 'ROBOT',
      api: robotApi,
      code: ''
    })
  }
}
