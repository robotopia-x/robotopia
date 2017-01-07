const _ = require('lodash')
const uid = require('uid')
const entities = require('../entities')
const { MOVE } = require('../../../lib/utils/types')
const { isFieldEmpty } = require('../../../lib/game')

const markerSpawner = {
  requires: ['position', 'team'],

  effects: {
    spawn: ({ position, team }, data, game, send) => {
      const marker = entities.marker({ x: position.x, y: position.y, teamId: team.id })

      send('game:createEntity', { data: marker }, _.noop)
      send('runtime:triggerEvent', {
        name: 'createMarker',
        groupId: team.id,
        args: [marker]
      }, _.noop)
    }
  }
}

const towerSpawner = {
  requires: ['position', 'team'],

  effects: {
    spawn: ({ position, team }, data, game, send) => {
      let x = position.x
      let y = position.y

      switch (position.rotation) {
        case MOVE.BACKWARD:
          y -= 1
          break
        case MOVE.FORWARD:
          y += 1
          break
        case MOVE.LEFT:
          x -= 1
          break
        case MOVE.RIGHT:
          x += 1
          break
      }

      if (isFieldEmpty(game, x, y)) {
        const marker = entities.tower({ x: position.x, y: position.y, teamId: team.id })

        // TODO: check here if enough resources are available

        send('game:createEntity', { data: marker }, _.noop)
      }
    }
  }
}

const robotSpawner = {
  requires: ['position', 'team'],

  reducers: {
    setStepsSinceLastSpawn: (state, { steps }) => {
      return {
        robotSpawner: { stepsSinceLastSpawn: { $set: steps } }
      }
    }
  },

  effects: {
    update: ({ id, robotSpawner, position, team }, data, game, send) => {
      let stepsSinceLastSpawn = robotSpawner.stepsSinceLastSpawn

      // TODO: add init event in game to handle initialization
      if (stepsSinceLastSpawn === undefined) {
        stepsSinceLastSpawn = 0
      }

      // spawn entity on interval
      if ((stepsSinceLastSpawn % robotSpawner.interval) === 0) {
        const id = uid()
        const robot = entities.robot({ id, x: position.x, y: position.y, teamId: team.id })

        send('game:createEntity', { data: robot }, _.noop)
        send('runtime:createRobot', { id, groupId: team.id }, _.noop)
      }

      // increment stepsSinceLastSpawn
      send('game:robotSpawner.setStepsSinceLastSpawn', {
        target: id,
        data: { steps: stepsSinceLastSpawn + 1 }
      }, _.noop)
    }
  }
}

module.exports = {
  markerSpawner,
  towerSpawner,
  robotSpawner
}
