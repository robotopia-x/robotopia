const html = require('choo/html')
const sf = require('sheetify')
const button = require('../element/button')

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
         min="100" max="1000"
         value="${state.gameSpeed}"
         oninput=${(evt) => send('changeGameSpeed', { speed: evt.target.value })} />
    ${spawnButton}
  </div>`
}

function playButtonView (state, send) {
  if (state.running) {
    return button({
      onclick: () => send('pauseSimulation'),
      icon: 'pause',
      label: 'Pause'
    })
  }

  return button({
    onclick: () => send('runSimulation'),
    icon: 'play',
    label: 'Play'
  })
}

module.exports = runtimeControlsView
