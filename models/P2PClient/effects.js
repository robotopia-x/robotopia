const ps = require('peer-star')

module.exports = globalConfig => ({
  joinStar: joinStar(globalConfig),
  stop: stop(globalConfig),
  send: send
})

function send (state, data, send, done) {
  if (!state.presenter) {
    console.log('MAIN not available')
    return done()
  }
  state.presenter.send(JSON.stringify(data))
  done()
}

function stop (globalConfig) {
  return inner
  function inner (state, nextOptions, send, done) {
    if (state.star) {
      console.log('star present')
      state.star.close(function () {
        console.log('closed star')
        state.star = null
        var info = {
          GID: null,
          CID: null,
          state: globalConfig.connectivityStates.none
        }
        send('client:connectivityChange', info, (err, res) => { if (err) done(err) })
        if (nextOptions) {
          send('p2c:joinStar', nextOptions, (err, res) => { if (err) done(err) })
        }
      })
    }
    done()
  }

}

function joinStar (globalConfig) {
  return inner
  function inner (state, options, send, done) {
    if (state.star) {
      send('p2c:stop', options)
    }
    var opts = {
      hubURL: globalConfig.hub,
      GID: options.GID,
      CID: options.CID,
      isMain: false
    }
    state.star = ps(opts)
    var info = {
      GID: state.star.GID,
      CID: state.star.CID
    }
    info.state = options.CID ? globalConfig.connectivityStates.recovering : globalConfig.connectivityStates.initialConnect
    send('client:connectivityChange', info, (err, res) => { if (err) done(err) })

    state.star.on('peer', (peer, id) => {
      if (id === 'MAIN') {
        console.log('connected to MAIN')
        send('p2c:setPresenterPeer', peer, (err, res) => { if (err) done(err) })
        var info = {
          GID: state.star.GID,
          CID: state.star.CID,
          state: globalConfig.connectivityStates.connected
        }
        send('client:connectivityChange', info, (err, res) => { if (err) done(err) })
        send('client:saveLocally', true, (err, res) => { if (err) done(err) })
        send('client:setUsername', null, (err, res) => { if (err) done(err) })
      }
    })
    state.star.on('disconnect', (peer, id) => {
      if (id === 'MAIN') {
        console.log('disconnected from MAIN')
        send('p2c:setPresenterPeer', null, (err, res) => { if (err) done(err) })
        var info = {
          GID: state.star.GID,
          CID: state.star.CID,
        }
        info.state = state.star.closed ? globalConfig.connectivityStates.none : globalConfig.connectivityStates.reconnecting
        send('client:connectivityChange', false, (err, res) => { if (err) done(err) })
      }
    })
    done()
  }
}
