const _ = require('lodash')
const update = require('immutability-helper')
const gameApi = require('./game/game-api')

const changeRunningState = ({ running }, state) => {
  return update(state, { running: { $set: running } })
}

const updateCode = ({ srcCode }, state) => {
  console.log('update code')
  return update(state, { srcCode: { $set: srcCode } })
}

module.exports = _.assign({},
  gameApi.actions,
  {
    changeRunningState,
    updateCode
  }
)
