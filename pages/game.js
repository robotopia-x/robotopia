const html = require('choo/html')

module.exports = function (globalConfig) {
  return function (state, prev, send) {
    if (state.connectivityState === globalConfig.connectivityStates.none) {
      send('location:set', '/')
    }

    return html`
<div>
    <div class="row">
        <h1>Welcome ${state.username}!</h1>
    </div>
    <div class="row">
        <textarea name="code" id="code">${state.code ? state.code : ''}</textarea>
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
      send('sendCode', code)
    }

    function cleanExit (event) {
      event.preventDefault()
      send('cleanExit', null)
    }
  }
}
