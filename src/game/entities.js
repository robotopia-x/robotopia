const { ORIENTATION } = require('../utils/types')

module.exports = {
  robot: ({ id, x, y }) => ({
    id,
    position: { x, y, rotation: 0 },
    movable: {},
    spawner: {
      type: 'marker'
    },
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

  base: ({ x, y, id }) => ({
    id,
    position: { x, y },
    spawner: {
      type: 'robot'
    },
    renderer: {
      type: 'SIMPLE',
      data: {
        sprite: 'BASE'
      }
    }
  }),

  marker: ({ x, y }) => ({
    position: { x, y },
    renderer: {
      type: 'SIMPLE',
      data: {
        sprite: 'MARKER'
      }
    }
  })
}
