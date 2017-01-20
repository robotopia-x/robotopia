const { ORIENTATION } = require('../../lib/utils/types')

module.exports = {
  robot: ({ id, x, y, teamId }) => ({
    id,
    health: {
      current: 5,
      max: 5
    },
    team: { id: teamId },
    position: { x, y, rotation: 0 },
    movable: {},
    discoverer: { range: 3 },
    markerSpawner: {},
    towerSpawner: {},
    collector: { hasResource: false },
    worker: { assignedTaskId: null },
    sprite: {
      type: 'ROTATING',
      data: {
        sprites: {
          [ORIENTATION.FRONT]: 'ROBOT_FRONT',
          [ORIENTATION.BACK]: 'ROBOT_BACK',
          [ORIENTATION.LEFT]: 'ROBOT_LEFT',
          [ORIENTATION.RIGHT]: 'ROBOT_RIGHT'
        }
      }
    }
  }),

  gem: ({ x, y }) => ({
    position: { x, y },
    item: { type: 'gem' },
    collectable: {},
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: 'GEM'
      }
    }
  }),

  base: ({ x, y, id, teamId }) => ({
    id,
    team: { id: teamId },
    position: { x, y },
    robotSpawner: {
      stepsSinceLastSpawn: 0,
      interval: 50
    },
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: 'BASE'
      }
    }
  }),

  tower: ({ id, x, y, teamId }) => ({
    id,
    team: { id: teamId },
    shooter: {
      range: 2,
      damage: 1
    },
    discoverable: { discovererTeamIds: {} },
    position: { x, y },
    collides: {},
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: 'TOWER'
      }
    }
  }),

  marker: ({ x, y, teamId, requiredWorkers, taskType }) => ({
    position: { x, y },
    team: { id: teamId },
    task: {
      type: taskType,
      requiredWorkers,
      assignedWorkers: 0
    },
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: 'MARKER'
      }
    }
  })
}
