const _ = require('lodash')
const uid = require('uid')
const entities = require('../game/entities')

function runSimulation (state, data, send) {
  console.log(state)
  send('clock:start', {}, _.noop)
  send('setRunningState', { running: true }, _.noop)
}

function runTutorialSimulation (state, data, send) {
  send('runtime:destroyRobot', { id: 'ROBOT' }, _.noop)
  send('runtime:createRobot', { id: 'ROBOT' }, _.noop)
  send('runSimulation', {}, _.noop)
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

function spawnBot ({ code }, data, send) {
  const id = uid()
  send('game:createEntity', { data: entities.robot({ id, x: 12, y: 12 }) }, _.noop)
  send('runtime:createRobot', { id, code }, _.noop)
}

function resetLevel (state, data, send) {
  send('stopSimulation', {}, _.noop)
  send('level:resetLevel', {}, _.noop)
}

function nextLevel (state, data, send) {
  send('stopSimulation', {}, _.noop)
  send('level:nextLevel', {}, _.noop)
}

function prevLevel (state, data, send) {
  send('stopSimulation', {}, _.noop)
  send('level:prevLevel', {}, _.noop)
}

module.exports = {
  runSimulation,
  runTutorialSimulation,
  stopSimulation,
  changeGameSpeed,
  tick,
  spawnBot,
  resetLevel,
  nextLevel,
  prevLevel
}
