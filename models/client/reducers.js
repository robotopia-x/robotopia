module.exports = globalConfig => ({
  updateUsername,
  connectivityChange: connectivityChange(globalConfig),
  suggestRecovery,
  denyRecovery,
  activateRecovery: activateRecovery(globalConfig)
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

function activateRecovery (globalConfig) {
  return inner
  function inner (state, _) {
    state.connectivityState = globalConfig.connectivityStates.recovering
  }
}

function suggestRecovery (state, storageData) {
  state.id = storageData.id
  state.username = storageData.username
  state.group = storageData.group
  state.code = storageData.code
  state.recoveryPossible = true
  console.log('suggesting recovery for: ' + storageData.group + ' as ' + storageData.username + ' with id ' + storageData.id)
  return state
}

function denyRecovery (state, _) {
  state.id = null
  state.username = null
  state.group = null
  state.code = null
  state.recoveryPossible = false
  return state
}
