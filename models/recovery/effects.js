module.exports = globalConfig => ({
  saveLocally: saveLocally(globalConfig),
  cleanExit: cleanExit(globalConfig),
  checkForPreviousSession: checkForPreviousSession(globalConfig),
  recover: recover(globalConfig)
})

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
    if (state.client.connectivityState === globalConfig.connectivityStates.connected) {
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