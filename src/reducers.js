const update = require('immutability-helper')

const setRunningState = ({ running }, state) => {
  return update(state, { running: { $set: running } })
}

const updateCode = ({ code }, state) => {
  const codeWithHandler = `
    robot.onCreateMarker = function (entity) {
      console.log('whoo something was created', entity)
    }

  ` + code

  return update(state, { code: { $set: codeWithHandler } })
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
