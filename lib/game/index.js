const model = require('./model')
const {
  getGameState,
  getEntity,
  getAllEntities,
  isFieldEmpty,
  findFieldNearPosition,
  findEmptyFieldNearPosition
} = require('./utils')

module.exports = {
  model,
  getGameState,
  getEntity,
  getAllEntities,
  isFieldEmpty,
  findFieldNearPosition,
  findEmptyFieldNearPosition
}
