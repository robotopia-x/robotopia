const html = require('choo/html')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})

module.exports = function (globalConfig) {
  return function (state, prev, send) {
    if (state.client.connectivityState === globalConfig.connectivityStates.none) {
      send('location:set', '/')
      return html`<div></div>`
    }

    return html`
<div class="center-child">
  <div>
    <div class="round_modal">
      <div class="row">
          <h1>Enter a Name</h1>
      </div>
      <div class="row">
          <input type="text" id="username" name="username" class="enter_id" value="${state.client.username ? state.client.username : ''}" autofocus="autofocus" >
          <button class="good" onclick=${publishName}>Confirm</button>
      </div>
    </div>
  </div>
</div>
`

    function publishName (event) {
      event.preventDefault()
      var username = document.getElementById('username').value
      if (username.length > 0) {
        send('client:setUsername', username)
        send('location:set', '/game')
      }
    }
  }
}
