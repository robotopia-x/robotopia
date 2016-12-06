const update = require('immutability-helper')

const setRunningState = ({ running }, state) => {
  return update(state, { running: { $set: running } })
}

const updateCode = ({ code }, state) => {
  return update(state, { code: { $set: code } })
}

const updateWorkspace = ({ workspace }, state) => {
  return update(state, { workspace: { $set: workspace } })
}

const setGameSpeed = ({ speed }, state) => {
  return update(state, { gameSpeed: { $set: speed } })
}

module.exports = {
  setRunningState,
  setGameSpeed,
  updateCode,
  updateWorkspace
}
