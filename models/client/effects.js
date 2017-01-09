module.exports = globalConfig => ({
  messageIncoming: messageIncoming,
  setUsername: setUsername(globalConfig),
  sendCode: sendCode(globalConfig),
  saveLocally: saveLocally(globalConfig),
  cleanExit: cleanExit(globalConfig),
  checkForPreviousSession: checkForPreviousSession(globalConfig),
  recover: recover(globalConfig)
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
    send('updateUsername', name, (err, res) => {
      if (err) done(err)
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

function saveLocally (globalConfig) {
  return inner
  function inner (state, _, send, done) {
    console.log('saving to: localStorage.' + globalConfig.storagePrefix)
    var obj = {}
    obj.id = state.id
    obj.username = state.username
    obj.group = state.group
    obj.code = state.code
    localStorage[globalConfig.storagePrefix] = JSON.stringify(obj) // eslint-disable-line
    done()
  }
}

function cleanExit (globalConfig) {
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
    delete localStorage[globalConfig.storagePrefix] // eslint-disable-line
    send('denyRecovery', null, (err, res) => { if (err) done(err) })
    send('location:set', '/', (err, res) => { if (err) done(err) })
    done()
  }
}

function checkForPreviousSession (globalConfig) {
  return inner
  function inner (_, __, send, done) {
    console.log('checking for previous session at: localStorage.' + globalConfig.storagePrefix)
    var obj = localStorage[globalConfig.storagePrefix] // eslint-disable-line
    if (!obj) {
      console.log('nothing found')
      return done()
    }
    try {
      obj = JSON.parse(obj)
    } catch (err) {
      console.log('error parsing localStorage')
      return done()
    }
    if (!obj.id || !obj.group || !obj.username) return done()
    send('suggestRecovery', obj, (err, res) => { if (err) done(err) })
    done()
  }
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
    send('activateRecovery', null, (err, res) => {if (err) done(err) })
    send('location:set', '/connecting', (err, res) => { if (err) done(err) })
    done()
  }

}