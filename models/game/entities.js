module.exports = {
  robot: ({ id, x, y, teamId }) => ({
    id,
    health: {
      current: 5,
      max: 5
    },
    team: { id: teamId },
    position: { x, y, rotation: 2 },
    movable: {},
    discoverer: { range: 2 },
    markerSpawner: {},
    towerSpawner: {},
    collector: { hasResource: false, chunk: 0 },
    worker: { assignedTask: null },
    zIndex: 1,
    sprite: {
      type: 'ROBOT',
      data: {},
      team: teamId === 2 ? 2 : 1
    },
    showRange: 0
  }),

  tutorialRobot: ({ id, x, y, teamId, orientation, resource, discoverRange, teamSprite, showRange }) => ({
    id,
    team: { id: teamId },
    position: { x, y, rotation: orientation },
    movable: {},
    discoverer: { range: discoverRange | 3 },
    markerSpawner: {},
    towerSpawner: {},
    collector: resource,
    worker: { assignedTask: null },
    zIndex: 5,
    sprite: {
      type: 'ROBOT',
      data: {},
      team: teamSprite === 2 ? 2 : 1
    },
    showRange: showRange
  }),

  gem: ({ x, y, value, chunks, color }) => ({
    position: { x, y },
    item: { type: 'gem' },
    discoverable: {
      type: 'resource',
      discovererTeamIds: {}
    },
    collides: {},
    collectable: {
      chunks: chunks,
      value: value,
      maxValue: value
    },
    zIndex: 1,
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: color + '_GEM'
      }
    }
  }),

  chest: ({ x, y, orientation }) => ({
    position: { x, y },
    zIndex: 1,
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: 'CHEST_' + orientation
      }
    }
  }),

  base: ({ x, y, id, teamId }) => ({
    id,
    team: { id: teamId },
    position: { x, y },
    robotSpawner: {
      spawnedRobots: 0,
      maxRobots: 15,
      stepsSinceLastSpawn: 0,
      interval: 5
    },
    zIndex: 1,
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: 'BASE'
      }
    }
  }),

  tutorialBase: ({ x, y, id, teamId }) => ({
    id,
    team: { id: teamId },
    position: { x, y },
    robotSpawner: {},
    zIndex: 1,
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
    zIndex: 1,
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
    zIndex: 0,
    task: {
      type: taskType,
      requiredWorkers,
      assignedWorkers: 0,
      completedWorkers: 0
    }
  })
}
