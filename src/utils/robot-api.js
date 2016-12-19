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
    placeMarker: () => ['game:spawner.spawn'],
    collectResource: () => ['game:collector.collectResource']
  },
  functions: {
    moveTo: function (xPos, yPos) {
      const entityPos = this.getPosition()
      const path = pathfinder.getMovementCommands({ x: entityPos.x, y: entityPos.y }, { x: xPos, y: yPos })

      for (let i = 0; i < path.length; i++) {
        this.move(path[i])
      }
    }
  },
  sensors: {
    getPosition: (state, game) => state.position
  }
}
