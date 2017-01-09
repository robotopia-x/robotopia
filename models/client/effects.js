module.exports = globalConfig => ({
  messageIncoming: messageIncoming,
  setUsername: setUsername(globalConfig),
  sendCode: sendCode(globalConfig)
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
