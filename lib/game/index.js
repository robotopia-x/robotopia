const model = require('./model')
const {
  getGameState,
  getEntity,
  getAllEntities,
  isFieldEmpty,
  getEmptyFieldNearPosition
} = require('./utils')

module.exports = {
  model,
  getGameState,
  getEntity,
  getAllEntities,
  isFieldEmpty,
  getEmptyFieldNearPosition
}
