const { MOVE, ROTATE } = require('./types')
const pathfinder = require('./pathfinder')

module.exports = {
  namespace: 'robot',
  globals: {
    pathfinder
  },
  actions: {
    move: (direction) => ['game:movable.move', { direction: MOVE[direction] }],
    rotate: (direction) => ['game:movable.rotate', { direction: ROTATE[direction] }],
    setRotation: (direction) => ['game:movable.setRotation', { direction: direction }],
    placeMarker: () => ['game:spawner.spawn'],
    collectResource: () => ['game:collector.collectResource']
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
    getPosition: (state, game) => state.position
  }
}
