const { MOVE, ROTATE, ORIENTATION } = require('../../lib/utils/types')
const pathfinder = require('../../lib/utils/pathfinder')
const {
  getGameState,
  getEntity,
  isFieldEmpty,
  getEmptyFieldNearPosition
} = require('../../lib/game')

module.exports = {
  namespace: 'robot',
  globals: {},
  actionsPerRound: 1,
  actions: {
    move: (direction) => ({
      action: ['game:movable.move', { direction: MOVE[direction] }],
      cost: 1
    }),
    rotate: (direction) => ({
      action: ['game:movable.rotate', { direction: ROTATE[direction] }],
      cost: 0
    }),
    setRotation: (direction) => ({
      action: ['game:movable.setRotation', { direction: ORIENTATION[direction] }],
      cost: 0
    }),
    placeMarker: () => ({
      action: ['game:markerSpawner.spawn'],
      cost: 1
    }),
    buildTower: () => ({
      action: ['game:towerSpawner.spawn'],
      cost: 1
    }),
    collectResource: () => ({
      action: ['game:collector.collectResource'],
      cost: 1
    })
  },

  // Be careful here, the methods are converted to strings and interpreted by esper
  // that's because we need to execute them step by step
  // inside the scope of the methods only the specified actions and sensors are available
  //
  // Examples:
  //   robot.rotate(1)
  //   robot.getPosition()

  methods: {
    moveTo: function (x, y) {
      var nextPosition
      var currentPosition = this.getPosition()
      var target = this.getEmptyFieldNearPosition(x, y)

      if (target === null) {
        return
      }

      var path = this.getPathTo(target.x, target.y)
      for (var i = 1; i < path.length; i++) {
        nextPosition = path[i]

        if (currentPosition.y < nextPosition.y) {
          this.setRotation('FRONT')
        } else if (currentPosition.y > nextPosition.y) {
          this.setRotation('BACK')
        } else if (currentPosition.x < nextPosition.x) {
          this.setRotation('RIGHT')
        } else {
          this.setRotation('LEFT')
        }

        this.move('FORWARD')

        currentPosition = nextPosition
      }
    }
  },
  sensors: {
    getPosition: (state, id) => {
      const game = getGameState(state)
      const entity = getEntity(id, game)

      return entity.position
    },

    isFieldEmpty: (state, id, x, y) => {
      const game = getGameState(state)

      return isFieldEmpty(game, x, y)
    },

    getEmptyFieldNearPosition: (state, id, x, y) => {
      const game = getGameState(state)

      return getEmptyFieldNearPosition(game, x, y)
    },

    getPathTo: (state, id, x, y) => {
      const game = getGameState(state)
      const entity = getEntity(id, game)

      return pathfinder.getPath(game, entity.position, { x, y })
    }
  }
}
