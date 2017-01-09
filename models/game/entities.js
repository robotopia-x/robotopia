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
    markerSpawner: {},
    towerSpawner: {},
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
    collectable: {},
    item: { type: 'gem' },
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
      interval: 20
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
    position: { x, y },
    collides: {},
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: 'TOWER'
      }
    }
  }),

  marker: ({ x, y, teamId }) => ({
    position: { x, y },
    team: { id: teamId },
    sprite: {
      type: 'SIMPLE',
      data: {
        sprite: 'MARKER'
      }
    }
  })
}
