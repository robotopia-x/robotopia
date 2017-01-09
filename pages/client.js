const html = require('choo/html')
const modal = require('../elements/web/modal')

var checkedForRecovery = false

module.exports = function (globalConfig) {
  return function (state, prev, send) {
    if (state.page === 'CONNECTING' || state.page === 'RECOVERING') return getConnectingHtml(state, prev, send)
    if (state.page === 'USERNAME') return getUsernameHtml(state, prev, send)
    if (state.page === 'GAME') return getGameHtml(state, prev, send)
    return getIndexHtml(state, prev, send)
  }

  function getIndexHtml(state, prev, send) {
      if (!checkedForRecovery) {
        checkedForRecovery = true
        send('client:checkForRecovery', null)
      }

      if (state.client.connectivityState === globalConfig.connectivityStates.recovering) {
        send('setPage', 'CONNECTING')
        return html`<div></div>`
      }

      if (state.client.recoveryPossible) {
        return modal(html`
    <div>
      <div class="row">
          <h1>Welcome!</h1>
      </div>
      <p>We found data from a previous session, would you like to recover?</p>
      <div class="row">
          <button class="good" onclick=${startRecovery}>Yes</button>
          <button class="bad" onclick=${denyRecovery}>No</button>
      </div>
    </div>
`)
      }

      return modal(html`
    <div>
      <div class="row">
          <h1>Welcome!</h1>
      </div>
      <p>To continue please enter the name of the group you would like to join</p>
      <div class="row">
          <input type="text" id="gid" name="gid" class="enter_id" autofocus="autofocus">
          <button class="good" onclick=${join}>Start</button>
      </div>
    </div>
`)

    function join (event) {
      event.preventDefault()
      var group = document.getElementById('gid').value
      if (group) {
        var obj = {
          GID: group
        }
        send('p2c:joinStar', obj)
        send('setPage', 'CONNECTING')
      }
    }

    function startRecovery (event) {
      event.preventDefault()
      send('client:recover', null)
      send('setPage', 'RECOVERING')
    }

    function denyRecovery (event) {
      event.preventDefault()
      send('client:denyRecovery', null)
    }
  }

  function getConnectingHtml(state, prev, send) {
    if (state.client.connectivityState === globalConfig.connectivityStates.none) {
      send('setPage', 'INDEX')
    }

    if (state.client.connectivityState === globalConfig.connectivityStates.connected) {
      if (!state.client.username) {
        send('setPage', 'USERNAME')
      } else {
        send('setPage', 'GAME')
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
      send('setPage', 'INDEX')
    }

  }

  function getUsernameHtml(state, prev, send) {
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
        send('setPage', 'GAME')
      }
    }
  }

  function getGameHtml(state, prev, send) {
    if (state.client.connectivityState === globalConfig.connectivityStates.none) {
      send('setPage', 'INDEX')
    }

    return html`
<div>
    <div class="row">
        <h1>Welcome ${state.client.username}!</h1>
    </div>
    <div class="row">
        <textarea name="code" id="code">${state.client.code ? state.client.code : ''}</textarea>
        <button onclick=${sendCode}>send as code</button>
    </div>
    <div class="row">
        <button onclick=${cleanExit}>clean Exit</button>
    </div>
</div>
`

    function sendCode (event) {
      var code = document.getElementById('code').value
      event.preventDefault()
      if (!code || code.length === 0) return
      send('client:sendCode', code)
    }

    function cleanExit (event) {
      event.preventDefault()
      send('client:quit', null)
    }
  }

}
