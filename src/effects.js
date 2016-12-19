const _ = require('lodash')
const clock = require('./utils/clock')
const robotRuntime = require('./utils/robot-runtime')
const { MOVE, ROTATE } = require('./utils/types')
const pathfinder = require('./utils/pathfinder')

function runSimulation ({ gameSpeed }, data, send) {
  clock.setSpeed(gameSpeed)
  clock.start()

  send('setRunningState', { running: true }, _.noop)
}

function pauseSimulation (state, data, send) {
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
  robotRuntime.spawnRobot({ spawnerId: 'BASE', api, code })
}

const api = {
  namespace: 'robot',
  globals: {
    pathfinder
  },
  actions: {
    move: (direction) => ['game:movable.move', { direction: MOVE[direction] }],
    rotate: (direction) => ['game:movable.rotate', { direction: ROTATE[direction] }],
    placeMarker: () => ['game:spawner.spawn'],
    collectResource: () => ['game:collector.collectResource']
  },
  functions: {
    moveTo: function (xPos, yPos) {
      const entityPos = this.getPosition()
      const path = pathfinder.getMovementCommands({ x: entityPos.x, y: entityPos.y }, { x: xPos, y: yPos })

      for (let i = 0; i < path.length; i++) {
        this.move(path[i])
      }
    }
  },
  sensors: {
    getPosition: (state, game) => state.position
  }
}

function triggerRuntimeEvent (state, { name, args }) {
  robotRuntime.triggerEvent(name, args)
}

module.exports = {
  runSimulation,
  pauseSimulation,
  changeGameSpeed,
  stepRobotRuntime,
  spawnBot,
  triggerRuntimeEvent
}
