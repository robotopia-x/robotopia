const html = require('choo/html')
const main = require('../../pages/main')

function view (state, prev, send) {
  return main(state, prev, send)

//  return html`
//<div>
//    <div class="row">
//        <h1>Welcome ${state.client.username}!</h1>
//    </div>
//    <div class="row">
//        <textarea name="code" id="code">${state.client.code ? state.client.code : ''}</textarea>
//        <button onclick=${sendCode}>send as code</button>
//    </div>
//    <div class="row">
//        <button onclick=${cleanExit}>clean Exit</button>
//    </div>
//</div>
//`

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

module.exports = view
