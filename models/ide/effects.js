const _ = require('lodash')
const clock = require('../../lib/utils/clock')
const robotRuntime = require('../../lib/utils/robot-runtime')
const robotApi = require('../../lib/utils/robot-api')

function runSimulation ({ gameSpeed, code }, data, send) {
  clock.setSpeed(gameSpeed)
  clock.start()

  robotRuntime.loadCode({ id: 'ROBOT', code })

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

function stepRobotRuntime (state, data, send) {
  send('game:beginStep', {}, _.noop)
  robotRuntime.step()
  send('game:completeStep', {}, _.noop)
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
