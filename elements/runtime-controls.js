const html = require('choo/html')
const button = require('./button')

function speedSlider (state, send) {
  return html`
      <input
         type="range"
         min="0" max="1"
         value="${state.gameSpeed}"
         oninput=${(evt) => send('changeGameSpeed', { speed: evt.target.value })} />
  `
}

function spawnButton (state, send) {
  return button({
    onclick: () => send('spawnBot'),
    label: 'Spawn Robot'
  })
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

function resetButton (state, send) {
  return button({
    onclick: () => send('resetLevel'),
    label: 'Reset'
  })
}

function nextLevelButton (state, send) {
  return button({
    onclick: () => send('nextLevel'),
    label: 'Next Level'
  })
}

function prevLevelButton (state, send) {
  return button({
    onclick: () => send('prevLevel'),
    label: 'Previous Level'
  })
}

module.exports = {
  spawnButton,
  speedSlider,
  playButtonView,
  resetButton,
  nextLevelButton,
  prevLevelButton
}
