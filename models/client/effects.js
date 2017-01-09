module.exports = globalConfig => ({
  messageIncoming: messageIncoming,
  setUsername: setUsername(globalConfig),
  sendCode: sendCode(globalConfig),
  checkForRecovery: checkForRecovery, 
  recover: recover(globalConfig),
  saveLocally: saveLocally,
  quit: quit(globalConfig)
})

function messageIncoming (state, data, send, done) {
  var update = {
    id: data.id
  }
  console.log('Message from ' + update + ' of type ' + data.type)
  done()
}

function setUsername(globalConfig) {
  return inner
  function inner (state, name, send, done) {
    if (!name) {
      name = state.username
    }
    if (!name || name.length === 0) {
      return done()
    }
    send('client:updateUsername', name, (err, res) => {
      if (err) return done(err)
      send('client:saveLocally', true, (err, res) => { if (err) done(err) })
    })
    if (state.connectivityState < globalConfig.connectivityStates.connected) {
      console.log('did not publish Username, because we have no connection')
      return done()
    }
    var data = {
      type: 'USERNAME',
      data: name
    }
    send('p2c:send', data, (err, res) => { if (err) done(err) })
    done()
  }

}

function sendCode(globalConfig) {
  return inner
  function inner (state, code, send, done) {
    // TODO: remove, testing purpose!!
    state.code = code
    if (state.connectivityState < globalConfig.connectivityStates.connected) {
      console.log('did not publish code, because no connection present')
      return done()
    }
    var data = {
      type: 'CODE',
      data: code
    }
    send('p2c:send', data, (err, res) => { if (err) done(err) })
    done()
  }
  
}

function checkForRecovery(state, data, send, done) {
  send('storage:loadFromLocalStorage', null, (err, res) => {
    if (err) return done(err)
    if (!res) return done()
    if (!res.id || !res.group) return done()
    send('client:suggestRecovery', res, (err, res) => { if(err) done(err) })
  })
}

function recover(globalConfig) {
  return inner
  function inner (state, _, send, done) {
    var opts
    opts = {
      GID: state.group,
      CID: state.id
    }
    send('p2c:joinStar', opts, (err, res) => { if (err) done(err) })
    send('client:activateRecovery', null, (err, res) => {if (err) done(err) })
    done()
  }

}

function saveLocally(state, _, send, done) {
  if (!state.group) return done()
  var obj = {
    username: state.username,
    group: state.group,
    id: state.id,
    code: state.code
  }
  send('storage:saveToLocalStorage', obj, (err, res) => {if(err) done(err) })
}

function quit (globalConfig) {
  return inner
  function inner (state, __, send, done) {
    if (state.connectivityState === globalConfig.connectivityStates.connected) {
      var data = {
        type: 'QUIT',
        data: null
      }
      send('p2c:send', data, (err, res) => { if (err) done(err) })
    }
    send('p2c:stop', null, (err, res) => { if (err) done(err) })
    send('storage:cleanLocalStorage', null, (err, res) => { if (err) done(err) })
    send('client:denyRecovery', null, (err, res) => { if (err) done(err) })
    done()
  }
}