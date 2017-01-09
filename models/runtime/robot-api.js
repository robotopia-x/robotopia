const _ = require('lodash')
const { MOVE, ROTATE, ORIENTATION } = require('../../lib/utils/types')
const pathfinder = require('../../lib/utils/pathfinder')
const {
  getGameState,
  getEntity,
  getAllEntities,
  isFieldEmpty,
  findFieldNearPosition,
  findEmptyFieldNearPosition
} = require('../../lib/game')

const SAVE_ZONE_SIZE = 4 // how far enemy towers have to build from base

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

      var target = this.findEmptyFieldNearPosition(x, y)

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
    },

    buildTowerNearPosition: function () { // don't use arrow shorthand here because it messes with toString
      var botPosition = this.getPosition()
      var towerPosition = this.findFieldForTowerNearPosition(botPosition.x, botPosition.y)

      this.moveTo(towerPosition.x, towerPosition.y)
      this.buildTower()
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

    findFieldForTowerNearPosition: (state, id, x, y) => {
      const game = getGameState(state)
      const bot = getEntity(id, game)
      const bases = getEnemyBases(game, bot)

      // find a field which is empty and not inside the save zone of another base
      return findFieldNearPosition(game, x, y, (game, x, y) => {
        if (!isFieldEmpty(game, x, y)) {
          return false
        }

        return _.every(bases, ({ position }) => {
          const distance = Math.sqrt(Math.pow(position.x - x, 2) + Math.pow(position.y - y, 2))
          return distance > SAVE_ZONE_SIZE
        })
      })
    },

    findEmptyFieldNearPosition: (state, id, x, y) => {
      const game = getGameState(state)

      return findEmptyFieldNearPosition(game, x, y)
    },

    getPathTo: (state, id, x, y) => {
      const game = getGameState(state)
      const entity = getEntity(id, game)

      return pathfinder.getPath(game, entity.position, { x, y })
    },

    getBasePosition: (state, id, x, y) => {
      const game = getGameState(state)
      const entity = getEntity(id, game)

      return getBaseOfTeam(game, entity.team.id).position
    },

    getRandomNumber: (state, id, min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}

function getBaseOfTeam (game, teamId) {
  const bases = getAllEntities('robotSpawner', game)

  return _.find(bases, ({ team }) => team.id === teamId)
}

function getEnemyBases (game, entity) {
  const bases = getAllEntities('robotSpawner', game)

  return _.filter(bases, ({ team }) => team.id !== entity.team.id)
}
