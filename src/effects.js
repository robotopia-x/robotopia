const _ = require('lodash')
const clock = require('./utils/clock')
const robotRuntime = require('./utils/robot-runtime')
const { MOVE, ROTATE } = require('./utils/types')

function runSimulation (data, { gameSpeed }, send) {
  clock.setSpeed(gameSpeed)
  clock.start()

  send('setRunningState', { running: true }, _.noop)
}

function pauseSimulation (data, state, send) {
  clock.stop()

  send('setRunningState', { running: false }, _.noop)
}

function changeGameSpeed ({ speed }, state, send) {
  clock.setSpeed(speed)

  send('setGameSpeed', { speed }, _.noop)
}

function stepRobotRuntime () {
  robotRuntime.step()
}

function spawnBot (data, { code }, send) {
  robotRuntime.spawnRobot({spawnerId: 'BASE', api, code})
}

const api = {
  move: (direction) => ['game:movable.move', { direction: MOVE[direction] }],
  rotate: (direction) => ['game:movable.rotate', { direction: ROTATE[direction] }],
  placeMarker: () => ['game:spawner.spawn'],
  collectResource: () => ['game:collector.collectResource']
}

module.exports = {
  runSimulation,
  pauseSimulation,
  changeGameSpeed,
  stepRobotRuntime,
  spawnBot
}
