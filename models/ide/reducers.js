const update = require('immutability-helper')

const setRunningState = (state, { running }) => {
  return update(state, { running: { $set: running } })
}

const updateCode = (state, { code }) => {
  return update(state, { code: { $set: code } })
}

const updateWorkspace = (state, { workspace }) => {
  return update(state, { workspace: { $set: workspace } })
}

const setGameSpeed = (state, { speed }) => {
  return update(state, { gameSpeed: { $set: speed } })
}

module.exports = {
  setRunningState,
  setGameSpeed,
  updateCode,
  updateWorkspace
}
