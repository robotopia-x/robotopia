const html = require('choo/html')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})

module.exports = function (globalConfig) {
  return function (state, prev, send) {
    if (!state.p2p.star || state.p2p.star.closed) {
      send('location:set', '/')
      return html`<div></div>`
    }

    return html`
<div>
    <div class="row">
        <h1>Board of Dashiness! ${state.p2p.star.GID}</h1>
    </div>
    <div class="row">
    <ul>
        ${state.clients.ids.map(clientToLi)}
    </ul>
    </div>
</div>
`
    function clientToLi (c) {
      return html`
    <li>${state.clients.names[c] + ' [' + c + ']'}</li>
  `
    }
  }
}
