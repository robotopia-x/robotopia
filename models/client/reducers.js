module.exports = globalConfig => ({
  updateUsername: updateUsername,
  connectivityChange: connectivityChange(globalConfig),
})

function connectivityChange (globalConfig) {
  return inner
  function inner (state, info) {
    state.group = info.GID
    state.id = info.CID
    state.connectivityState = info.state
    return state
  }
}

function updateUsername (state, name) {
  state.username = name
  return state
}
