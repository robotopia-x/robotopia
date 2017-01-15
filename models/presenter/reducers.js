module.exports = globalConfig => ({
  clientAdded: addClient,
  clientQuit: clientQuit,
  clientLeft: clientLeft,
  updateUsername: updateUsername,
  updateCode: updateCode(globalConfig)
})

function addClient (state, data) {
  if (state.clients.ids.indexOf(data.id) < 0) {
    state.clients.ids.push(data.id)
    state.clients.names[data.id] = 'unknown'
  }
  state.clients.peers[data.id] = data.peer
  return state
}

function clientQuit (state, data) {
  return removeClientByID(state, data.id)
}

function clientLeft (state, data) {
  if (state.clients.ids.indexOf(data.id) < 0) return state
  state.clients.peers[data.id] = null
  return state
}

function removeClientByID (state, id) {
  var i = state.clients.ids.indexOf(id)
  if (i < 0) return
  state.clients.ids.splice(i, 1)
  delete state.clients.names[id]
  if (state.clients.peers[id]) {
    state.clients.peers[id].destroy()
    delete state.clients.peers[id]
  }
  return state
}

function updateUsername (state, data) {
  state.clients.names[data.id] = data.name
  return state
}

function updateCode (globalConfig) {
  return inner
  function inner (state, data) {
    var codeArray
    if (!state.clients.code.hasOwnProperty(data.id)) {
      state.clients.code[data.id] = []
    }
    codeArray = state.clients.code[data.id]
    codeArray.unshift(data.code)
    if (codeArray.length > globalConfig.MAX.codeHistory) {
      state.clients.code[data.id] = codeArray.slice(0, globalConfig.MAX.codeHistory)
    }
    console.log(state.clients.code[data.id])
    return state
  }
}
