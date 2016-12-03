const update = require('immutability-helper')

const changeRunningState = ({ running }, state) => {
  return update(state, { running: { $set: running } })
}

const updateCode = ({ code }, state) => {
  return update(state, { code: { $set: code } })
}

const updateWorkspace = ({ workspace }, state) => {
  return update(state, { workspace: { $set: workspace } })
}

const updateCanvas = ({ canvas }, state) => {
  return update(state, { canvas: { $set: canvas } })
}

const setGameSpeed = ({ speed }, state) => {
  return update(state, { gameSpeed: { $set: speed } })
}

module.exports = {
  changeRunningState,
  updateCode,
  updateWorkspace,
  updateCanvas,
  setGameSpeed
}
