const html = require('choo/html')

var checkedForRecovery = false

module.exports = function (globalConfig) {
  return function (state, prev, send) {
    if (!checkedForRecovery) {
      checkedForRecovery = true
      send('client:checkForRecovery', null)
    }

    if (state.client.connectivityState === globalConfig.connectivityStates.recovering) {
      send('location:set', '/connecting', (err, res) => { if (err) done(err) })
      return html`<div></div>`
    }

    if (state.client.recoveryPossible) {
      return html`
<div id="login">
  <div class="center">
    <div class="login_window">
      <div class="row">
          <h1>Welcome!</h1>
      </div>
      <p>We found data from a previous session, would you like to recover?</p>
      <div class="row">
          <button class="login_start" onclick=${startRecovery}>Yes</button>
          <button class="login_cancel" onclick=${denyRecovery}>No</button>
      </div>
    </div>
  </div>
</div>
`
    }

    return html`
<div id="login">
  <div class="center">
    <div class="login_window">
      <div class="row">
          <h1>Welcome!</h1>
      </div>
      <p>To continue please enter the name of the group you would like to join</p>
      <div class="row">
          <input type="text" id="gid" name="gid" class="enter_id" autofocus="autofocus">
          <button class="login_start" onclick=${start}>Start</button>
      </div>
    </div>
  </div>
</div>
`
    function start (event) {
      event.preventDefault()
      var group = document.getElementById('gid').value
      if (group) {
        var obj = {
          GID: group
        }
        send('p2c:joinStar', obj)
        send('location:set', '/connecting')
      }
    }

    function startRecovery (event) {
      event.preventDefault()
      send('client:recover', null)
    }

    function denyRecovery (event) {
      event.preventDefault()
      send('client:denyRecovery', null)
    }
  }
}
