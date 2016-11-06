const _ = require('lodash')
const update = require('immutability-helper')
const gameApi = require('./game/game-api')

const changeRunningState = ({ running }, state) => {
  return update(state, { running: { $set: running } })
}

const updateCode = ({ srcCode }, state) => {
  return update(state, { srcCode: { $set: srcCode } })
}

const updateWorkspace = ({ workspace }, state) => {
  return update(state, {workspace: { $set: workspace }})
}

module.exports = _.assign({},
  gameApi.actions,
  {
    changeRunningState,
    updateCode,
    updateWorkspace
  }
)
