const { ORIENTATION } = require('../../lib/utils/types')

module.exports = {
  robot: ({ id, x, y, teamId }) => ({
    id,
    team: { id: teamId },
    position: { x, y, rotation: 0 },
    movable: {},
    collides: {},
    markerSpawner: {},
    renderer: {
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
    renderer: {
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
    renderer: {
      type: 'SIMPLE',
      data: {
        sprite: 'BASE'
      }
    }
  }),

  tower: ({ id, x, y, teamId }) => ({
    id,
    team: { id: teamId },
    position: { x, y },
    renderer: {
      type: 'SIMPLE',
      data: {
        sprite: 'TOWER'
      }
    }
  }),

  marker: ({ x, y, teamId }) => ({
    position: { x, y },
    team: { id: teamId },
    renderer: {
      type: 'SIMPLE',
      data: {
        sprite: 'MARKER'
      }
    }
  })
}
