const html = require('choo/html')

module.exports = function (globalConfig) {
  return function (state, prev, send) {
    if (state.client.connectivityState === globalConfig.connectivityStates.none) {
      send('location:set', '/')
    }

    if (state.client.connectivityState === globalConfig.connectivityStates.connected) {
      send('location:set', '/choseUsername')
    }

    return html`
<div class="center-child">
  <div>
    <div class="round_modal">
      <div class="row">
          <h1>Connecting...</h1>
      </div>
      <div class="row">
          <img src="../assets/img/web/load.gif" alt="loading" class="connecting">
      </div>
      <div class="row">
        <button class="login_cancel" onclick=${cancel}>Cancel</button>
      </div>
    </div>
  </div>
</div>
`

    function cancel (event) {
      send('p2c:stop', null)
      send('location:set', '/')
    }
  }
}
