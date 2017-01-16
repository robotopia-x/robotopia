const html = require('choo/html')
const cuid = require('cuid')
const modal = require('./../elements/modal')

module.exports = function (state, prev, send) {
  const { connection } = state

  if (connection.state === 'INDEX') return getIndexHtml(state, prev, send)
  if (connection.state === 'DASHBOARD') return getDashboardHtml(state, prev, send)
}

function getIndexHtml (state, prev, send) {
  return modal(html`
    <div>
      <div class="row">
          <h1>Welcome!</h1>
      </div>
      <p>To continue please enter a rather unique name for your group or create one</p>
      <div class="row">
          <input type="text" id="gid" name="gid" class="enter_id" autofocus="autofocus">
          <button class="random_id" onclick=${generateRandomGroup}>Generate Name</button>
      </div>
      <button class="good" value="Start" onclick=${startPeerstarMain}>Start</button>
    </div>
`)

  function generateRandomGroup (event) {
    event.preventDefault()
    var group = cuid()
    // extract client fingerprint
    group = group.slice(13, 17)
    document.getElementById('gid').value = group
  }

  function startPeerstarMain (event) {
    event.preventDefault()
    var group = document.getElementById('gid').value
    if (group) {
      send('p2p:createStar', group)
      send('connection:set', 'DASHBOARD')
    }
  }


}

function getDashboardHtml (state, prev, send) {
  if (!state.p2p.star || state.p2p.star.closed) {
    send('connection:set', 'INDEX')
    return html`<div></div>`
  }

  return html`<div>
  ${state.presenter.clients.ids.map(clientListMaker)}

</div>`

  function clientListMaker (c) {
    return html`<li>${state.presenter.clients.names[c] + ' [' + c + ']'}</li>`
  }
}


