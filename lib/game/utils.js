const _ = require('lodash')
const uid = require('uid')
const update = require('immutability-helper')

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
  return !(game.tiles[y] === undefined || game.tiles[y][x] === undefined || game.tiles[y][x] === 0)
}

module.exports = {
  getGameState,
  updateGameState,
  createEntity,
  getEntity,
  deleteEntity,
  getAllEntities,
  isFieldEmpty
}