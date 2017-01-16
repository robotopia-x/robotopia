const html = require('choo/html')
const modal = require('./modal')
const gameView = require('./game')

var checkedForRecovery = false

module.exports = function (globalConfig) {
  return function (state, prev, send) {
    const { connection } = state

    if (connection.state === 'CONNECTING' || connection.state === 'RECOVERING') return getConnectingHtml(state, prev, send)
    if (connection.state === 'USERNAME') return getUsernameHtml(state, prev, send)
    if (connection.state === 'GAME') return getGameHtml(state, prev, send)
    return getIndexHtml(state, prev, send)
  }

  function getIndexHtml (state, prev, send) {
    if (!checkedForRecovery) {
      checkedForRecovery = true
      send('client:checkForRecovery', null)
    }

    if (state.client.connectivityState === globalConfig.connectivityStates.recovering) {
      send('connection:set', 'CONNECTING')
      return html`<div></div>`
    }

    if (state.client.recoveryPossible) {
      return modal(html`
    <div>
      <p>We found data from a previous session, would you like to recover?</p>
      <button class="good" onclick=${startRecovery}>Yes</button>
      <button class="bad" onclick=${denyRecovery}>No</button>
    </div>
`)
    }

    return modal(html`
    <div>
      <p>To continue please enter the name of the group you would like to join</p>
      <input type="text" id="gid" name="gid" class="enter_id" autofocus="autofocus">
      <button class="good" onclick=${join}>Start</button>
    </div>
`)

    function join (event) {
      event.preventDefault()
      var group = document.getElementById('gid').value
      console.log('join', group)

      if (group) {
        var obj = {
          GID: group
        }
        send('p2c:joinStar', obj)
        send('connection:set', 'CONNECTING')
      }
    }

    function startRecovery (event) {
      event.preventDefault()
      send('client:recover', null)
      send('connection:set', 'RECOVERING')
    }

    function denyRecovery (event) {
      event.preventDefault()
      send('client:denyRecovery', null)
    }
  }

  function getConnectingHtml (state, prev, send) {
    console.log('connecting')

    if (state.client.connectivityState === globalConfig.connectivityStates.none) {
      console.log('redirect index')
      send('setPage', 'INDEX')
    }

    if (state.client.connectivityState === globalConfig.connectivityStates.connected) {
      console.log('redirect foo')
      if (!state.client.username) {
        send('connection:set', 'USERNAME')
      } else {
        send('connection:set', 'GAME')
      }
    }

    return modal(html`
    <div>
      <div class="row">
          <h1>Connecting...</h1>
      </div>
      <div class="row">
          <img src="../assets/img/web/load.gif" alt="loading" class="connecting">
      </div>
      <div class="row">
        <button class="bad" onclick=${cancel}>Cancel</button>
      </div>
    </div>
`)

    function cancel (event) {
      event.preventDefault()
      send('p2c:stop', null)
      send('connection:set', 'INDEX')
    }
  }

  function getUsernameHtml (state, prev, send) {
    if (state.client.connectivityState === globalConfig.connectivityStates.none) {
      send('location:set', '/')
      return html`<div></div>`
    }

    return modal(html`
    <div>
      <div class="row">
          <h1>Enter a Name</h1>
      </div>
      <div class="row">
          <input type="text" id="username" name="username" class="enter_id" value="${state.client.username ? state.client.username : ''}" autofocus="autofocus" >
          <button class="good" onclick=${publishName}>Confirm</button>
      </div>
    </div>
`)

    function publishName (event) {
      event.preventDefault()
      var username = document.getElementById('username').value
      if (username.length > 0) {
        send('client:setUsername', username)
        send('connection:set', 'GAME')
      }
    }
  }

  function getGameHtml (state, prev, send) {
    if (state.client.connectivityState === globalConfig.connectivityStates.none) {
      send('connection:set', 'INDEX')
    }
    return gameView(state, prev, send)
  }
}
