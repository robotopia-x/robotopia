const model = require('./model')
const {
  getGameState,
  getEntity,
  getAllEntities,
  isFieldEmpty,
  findFieldNearPosition,
  findEmptyFieldNearPosition,
  getTeamResources,
  hasEnoughResources,
  getTeamGamePoints,
  interpolate
} = require('./utils')

module.exports = {
  model,
  getGameState,
  getEntity,
  getAllEntities,
  isFieldEmpty,
  findFieldNearPosition,
  findEmptyFieldNearPosition,
  getTeamResources,
  hasEnoughResources,
  getTeamGamePoints,
  interpolate
}
