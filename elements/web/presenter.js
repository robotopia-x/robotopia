const html = require('choo/html')

function view (state, prev, send) {
  return html`
<div>
    <div class="row">
        <h1>Board of Dashiness! ${state.p2p.star.GID}</h1>
    </div>
    <div class="row">
    <ul>
        ${state.presenter.clients.ids.map(clientListMaker)}
    </ul>
    </div>
</div>
`

  function clientListMaker (c) {
    return html`<li>${state.presenter.clients.names[c] + ' [' + c + ']'}</li>`
  }
}

module.exports = view
