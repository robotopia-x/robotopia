const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    height: 30px;
    width: 75px;
    border: none;
    border-radius: 5%;
    font-family: Helvetica, Arial, Sans-Serif;
  }
  
  :host.clickable {
    color: #404040;
    background-color: #dddddd;
    font-size: 14px;
  }
   
  :host.clickable:hover {
    color: #2b2b2b;
    background-color: white;
  }
  
  :host.disabled {
    font-size: 12px;
  }
`

function runtimeControlsView (state, prev, send) {
  if (state.running) {
    return html`
      <button class=${prefix + ' disabled'} disabled>Running...</button>
   `
  }

  return html`
    <button class=${prefix + ' clickable'} onclick=${() => send('runCode', { })}>► Run</button>
  `
}

module.exports = runtimeControlsView
