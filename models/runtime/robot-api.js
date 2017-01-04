const { MOVE, ROTATE, ORIENTATION } = require('../../lib/utils/types')
const pathfinder = require('../../lib/utils/pathfinder')
const { getGameState, getEntity, isFieldWalkable } = require('../../lib/utils/game')

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
      cost: 0
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
      var target = this.getWalkableFieldNearPosition(x, y)
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

    isFieldWalkable: (state, id, x, y) => {
      const game = getGameState(state)

      return isFieldWalkable(game, x, y)
    },

    getWalkableFieldNearPosition: (state, id, x, y) => {
      const game = getGameState(state)

      if (isFieldWalkable(game, x, y)) {
        return { x, y }
      }

      // expand search for walkable field in a square spiral around the target field
      // on each iteration go one step further away

      let direction = 0
      let length = 0

      let testX = x
      let testY = y

      while (length <= game.tiles.length) {
        if (isFieldWalkable(game, testX, testY)) {
          return { x: testX, y: testY }
        }

        for (let i = 0; i <= length; i++) {
          switch (direction) {
            case 0: // DOWN
              testY += 1
              break
            case 1: // LEFT
              testX -= 1
              break
            case 2: // UP
              testY -= 1
              break
            case 3: // RIGHT

              testX += 1
              break
          }
        }

        if (direction === 1 || direction === 3) {
          length += 1
        }

        direction = (direction + 1) % 4
      }
    },

    getPathTo: (state, id, x, y) => {
      const game = getGameState(state)
      const entity = getEntity(id, game)

      return pathfinder.getPath(game, entity.position, { x, y })
    }
  }
}
