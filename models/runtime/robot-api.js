const { MOVE, ROTATE } = require('../../lib/utils/types')
const pathfinder = require('../../lib/utils/pathfinder')
const game = require('../../lib/utils/game')

module.exports = {
  namespace: 'robot',
  globals: {
    pathfinder
  },
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
      action: ['game:movable.setRotation', { direction: direction }],
      cost: 0
    }),
    placeMarker: () => ({
      action: ['game:markerSpawner.spawn'],
      cost: 1
    }),
    collectResource: () => ({
      action: ['game:collector.collectResource'],
      cost: 1
    })
  },
  functions: {
    moveTo: function (xPos, yPos) {
      var entityPos = this.getPosition()
      var path = pathfinder.getMovementCommands({ x: entityPos.x, y: entityPos.y }, { x: xPos, y: yPos })

      for (var i = 0; i < path.length; i++) {
        this.setRotation(path[i])
        this.move('FORWARD')
      }

      this.setRotation(entityPos.rotation)
    }
  },
  sensors: {
    getPosition: (state, id) => {
      const entity = game.getEntity(id, state.current)
      return entity.position
    }
  }
}
