const _ = require('lodash')
const clock = require('./utils/clock')
const robotRuntime = require('./utils/robot-runtime')
const robotApi = require('./utils/robot-api')

function runSimulation ({ gameSpeed }, data, send) {
  clock.setSpeed(gameSpeed)
  clock.start()

  send('setRunningState', { running: true }, _.noop)
}

function stopSimulation (state, data, send) {
  clock.stop()

  send('setRunningState', { running: false }, _.noop)
}

function changeGameSpeed (state, { speed }, send) {
  clock.setSpeed(speed)

  send('setGameSpeed', { speed }, _.noop)
}

function stepRobotRuntime () {
  robotRuntime.step()
}

function spawnBot ({ code }, data) {
  robotRuntime.spawnRobot({ spawnerId: 'BASE', api: robotApi, code })
}

function triggerRuntimeEvent (state, { name, args }) {
  robotRuntime.triggerEvent(name, args)
}

module.exports = {
  runSimulation,
  stopSimulation,
  changeGameSpeed,
  stepRobotRuntime,
  spawnBot,
  triggerRuntimeEvent
}
