const html = require('choo/html')
const sf = require('sheetify')

const buttonPrefix = sf`
  :host {
    height: 30px;
    width: 75px;
    border: none;
    border-radius: 5%;
    font-size: 14px;
    font-family: Helvetica, Arial, Sans-Serif;
    color: #404040;
    background-color: #dddddd;
  }

  :host :hover {
    color: #2b2b2b;
    background-color: white;
  }
`

function runtimeControlsView (state, prev, send) {
  return html`
  <div>
    ${runButtonView(state, send)}
      <input
         type='range'
         min='100' max='1000'
         value=${ state.gameSpeed }
         oninput=${(evt) => send('changeGameSpeed', { speed: evt.target.value })} />
  </div>
  `
}

function runButtonView (state, send) {
  if (state.running) {
    return html`
      <button class=${buttonPrefix} onclick=${() => send('stopSimulation')}>Stop</button>
   `
  }

  return html`
    <button class=${buttonPrefix} onclick=${() => send('startSimulation')}>► Run</button>
  `
}

module.exports = runtimeControlsView
