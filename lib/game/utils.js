const _ = require('lodash')
const uid = require('uid')
const update = require('immutability-helper')

function init (state) {
  const current = _.assign(
    {},
    state,
    {
      entities: _.reduce(state.entities, (entities, entity) => {
        const entityWithId = createEntity(entity)
        entities[entityWithId.id] = entityWithId
        return entities
      }, {})
    }
  )

  return {
    isGameStepCompleted: true, // when false, game is currently in between two steps
    prev: null,
    current,
    next: null
  }
}

function getGameState (state) {
  if (!state.isGameStepCompleted) {
    return state.next
  }

  return state.current
}

function updateGameState (state, changes) {
  if (!state.isGameStepCompleted) {
    return update(state, { next: changes })
  }

  return update(state, { current: changes })
}

function createEntity (entity) {
  if (!entity.id) {
    entity.id = uid()
  }

  // TODO: enforce component requirements

  return entity
}

function getEntity (id, game) {
  return game.entities[id]
}

function deleteEntity (id, game) {
  return _.omitBy(game.entities, (entitiy) => {
    return entitiy.id === id
  })
}

function getAllEntities (componentType, game) {
  return _.filter(game.entities, (entity) => !_.isUndefined(entity[componentType]))
}

function isFieldEmpty (game, x, y) {
  if (game.tiles[y] === undefined || game.tiles[y][x] === undefined || game.tiles[y][x] === 1) {
    return false
  }

  return !_.some(getAllEntities('collides', game), ({ position }) => position.x === x && position.y === y)
}

// searches for field which fulfills the predicate by iterating over every game field in a square spiral around the target field
function findFieldNearPosition (game, x, y, predicate) {
  let direction = 0 // which direction we're moving
  let length = 0 // how many steps we move, will be increased after two direction changes

  let testX = x // x coordinate of the field we check
  let testY = y // y coordinate

  // keep expanding until we exceeded the board size
  const fieldSize = Math.max(game.tiles.length, game.tiles[0].length)
  while (length <= fieldSize) {
    for (let i = 0; i <= length; i++) {
      // return if we found a walkable field

      if (predicate(game, testX, testY)) {
        return { x: testX, y: testY }
      }

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

    // increase spiral length after every 2 turns
    if (direction % 2 === 1) {
      length += 1
    }

    // turn clockwise
    direction = (direction + 1) % 4
  }

  // no empty field found
  return null
}

function findEmptyFieldNearPosition (game, x, y) {
  return findFieldNearPosition(game, x, y, isFieldEmpty)
}

function getTeamResources ({ resources }, teamId) {
  return _.get(resources, teamId, 0)
}

function getTeamGamePoints ({ gamePoints }, teamId) {
  return _.get(gamePoints, teamId, 0)
}

function hasEnoughResources ({ resources }, teamId, amount) {
  return _.get(resources, teamId, 0) >= amount
}

module.exports = {
  init,
  getGameState,
  updateGameState,
  createEntity,
  getEntity,
  deleteEntity,
  getAllEntities,
  isFieldEmpty,
  findFieldNearPosition,
  findEmptyFieldNearPosition,
  getTeamResources,
  hasEnoughResources,
  getTeamGamePoints
}
