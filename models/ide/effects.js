const _ = require('lodash')

function runSimulation ({ code }, data, send) {
  send('clock:start', {}, _.noop)
  send('runtime:destroyRobot', { id: 'ROBOT' }, _.noop)
  send('runtime:createRobot', { id: 'ROBOT', code }, _.noop)
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

function tick (state, data, send) {
  send('game:beginStep', {}, _.noop)
  send('runtime:step', {}, _.noop)
  send('game:completeStep', {}, _.noop)
}

function spawnBot ({ code }, data) {
  console.log('spawnBot: noop')
  // robotRuntime.spawnRobot({ spawnerId: 'BASE', api: robotApi, code })
}

function triggerRuntimeEvent (state, { name, args }) {
  console.log('triggerRuntimeEvent: noop')
  // robotRuntime.triggerEvent(name, args)
}

module.exports = {
  runSimulation,
  stopSimulation,
  changeGameSpeed,
  tick,
  spawnBot,
  triggerRuntimeEvent
}
