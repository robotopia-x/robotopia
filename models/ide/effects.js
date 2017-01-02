const _ = require('lodash')
const robotRuntime = require('../../lib/utils/robot-runtime')
const robotApi = require('../../lib/utils/robot-api')

function runSimulation ({ code }, data, send) {
  send('clock:start', {}, _.noop)
  robotRuntime.loadCode({ id: 'ROBOT', code })
  send('setRunningState', { running: true }, _.noop)
}

function stopSimulation (state, data, send) {
  send('clock:stop', {}, _.noop)
  send('setRunningState', { running: false }, _.noop)
}

function changeGameSpeed (state, { speed }, send) {
  // translate speed (value from 0  1) to intervalDuration (100 - 1000 ms)
  const intervalDuration = 100 + ((1 - speed) * 900)
  send('clock:setIntervalDuration', { intervalDuration }, _.noop)
  send('setGameSpeed', { speed }, _.noop)
}

function stepRobotRuntime (state, data, send) {
  send('game:beginStep', {}, _.noop)
  robotRuntime.step()
  send('clock:setProgress', { progress: 0 }, _.noop)
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
