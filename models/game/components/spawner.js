const _ = require('lodash')
const uid = require('uid')
const entities = require('../entities')

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
  robotSpawner
}
