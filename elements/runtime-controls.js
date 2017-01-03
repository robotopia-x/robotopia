const html = require('choo/html')
const sf = require('sheetify')
const button = require('./button')

const prefix = sf`
  :host {
    display: flex;
    flex-direction: row;
  }

  :host > * {
    margin-left: 20px;
  }

  :host > :first-child {
    margin-left: 0;
  }
`

function runtimeControlsView (state, prev, send) {
  const spawnButton = button({
    onclick: () => send('spawnBot'),
    label: 'Spawn Robot'
  })

  return html`
  <div class="${prefix}">
    ${playButtonView(state, send)}
      <input
         type="range"
         min="0" max="1"
         value="${state.gameSpeed}"
         oninput=${(evt) => send('changeGameSpeed', { speed: evt.target.value })} />    
     ${spawnButton}
  </div>`
}

function playButtonView (state, send) {
  if (state.running) {
    return button({
      onclick: () => send('stopSimulation'),
      icon: 'stop',
      label: 'Stop'
    })
  }

  return button({
    onclick: () => send('runSimulation'),
    icon: 'play',
    label: 'Run'
  })
}

module.exports = runtimeControlsView
