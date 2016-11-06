const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    height: 30px;
    width: 75px;
    color: ##404040;
    background-color: #dddddd;
    border: none;
    border-radius: 5%;
    font-size: 14px;
    font-family: Helvetica, Arial, Sans-Serif;
    text-decoration: none;
    vertical-align: middle;
  }
  
  :host:hover {
    color: #2b2b2b;
    background-color: white;
  }
`

function runtimeControlsView (state, prev, send) {
  if (state.running) {
    return html`
      <button id="disabled" class=${prefix} disabled>Running...</button>
   `
  }

  return html`
    <button id="clickable" class=${prefix} onclick=${() => send('runCode', { })}>► Run</button>
  `
}

module.exports = runtimeControlsView
