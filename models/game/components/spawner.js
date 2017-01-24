const _ = require('lodash')
const uid = require('uid')
const entities = require('../entities')
const { isFieldEmpty } = require('../../../lib/game')
const { hasEnoughResources } = require('../../../lib/game')

const markerSpawner = {
  requires: ['position', 'team'],

  effects: {
    spawn: (state, { type, requiredWorkers }, game, send) => {
      const { position, team } = state
      const marker = entities.marker({
        x: position.x,
        y: position.y,
        teamId: team.id,
        taskType: type,
        requiredWorkers
      })

      send('game:createEntity', { data: marker }, _.noop)
    }
  }
}

const towerSpawner = {
  requires: ['position', 'team'],

  effects: {
    spawn: ({ position, team }, data, game, send) => {
      const x = position.x
      const y = position.y

      if (isFieldEmpty(game, x, y)) {
        const tower = entities.tower({ x, y, teamId: team.id })

        // TODO: remove ! / insert real cost of tower
        if (!hasEnoughResources(game, team.id, 10)) {
          send('game:createEntity', { data: tower }, _.noop)
          send('game:addPoints', { teamId: team.id, amount: 100 }, _.noop)
          send('game:removeResources', { teamId: team.id, amount: 100 }, _.noop)
        }

        // TODO: check that tower is not near base, this is checked in the buildTowerNearPosition
        //       but could be circumvented by calling spawn direclty with custom Javascript code
      }
    }
  }
}

const robotSpawner = {
  requires: ['position', 'team'],

  reducers: {
    _setStepsSinceLastSpawn: (state, { steps }) => ({
      robotSpawner: {
        stepsSinceLastSpawn: { $set: steps }
      }
    }),

    _incSpawnedRobots: ({ robotSpawner }) => ({
      robotSpawner: {
        spawnedRobots: { $set: robotSpawner.spawnedRobots + 1 }
      }
    })
  },

  effects: {
    update: ({ id, robotSpawner, position, team }, data, game, send) => {
      let { stepsSinceLastSpawn, maxRobots, spawnedRobots } = robotSpawner

      if (spawnedRobots === maxRobots) {
        return
      }

      // spawn entity on interval
      if ((stepsSinceLastSpawn % robotSpawner.interval) === 0) {
        const robotId = uid()
        const robot = entities.robot({ id: robotId, x: position.x, y: position.y, teamId: team.id })

        send('game:robotSpawner._incSpawnedRobots', {
          target: id,
          data: {}
        }, _.noop)
        send('runtime:createRobot', { id: robotId, groupId: team.id }, _.noop)
        send('game:createEntity', { data: robot }, _.noop)
      }

      // increment stepsSinceLastSpawn
      send('game:robotSpawner._setStepsSinceLastSpawn', {
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
