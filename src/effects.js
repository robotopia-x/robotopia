const _ = require('lodash')
const clock = require('./utils/clock')
const robotRuntime = require('./utils/robot-runtime')

const startSimulation = (data, { code, gameSpeed }, send, done) => {
  robotRuntime.loadCode(code)

  clock.setSpeed(gameSpeed)
  clock.start(() => {
    if (robotRuntime.step()) {
      send('changeRunningState', { running: false }, _.noop)
      clock.stop()
      done()
    }
  })

  send('changeRunningState', { running: true }, _.noop)
}

const stopSimulation = (data, state, send) => {
  clock.stop()
  send('changeRunningState', { running: false }, _.noop)
}

const changeGameSpeed = ({ speed }, state, send) => {
  send('setGameSpeed', { speed }, _.noop)
  clock.setSpeed(speed)
}

module.exports = {
  startSimulation,
  stopSimulation,
  changeGameSpeed
}
