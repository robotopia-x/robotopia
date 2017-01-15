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
    onClick: () => send('spawnBot'),
    label: 'Spawn Robot'
  })
}

function playButtonView ({
  isRunning,
  onStart, onStop
}) {
  if (isRunning) {
    return button({
      onClick: onStop,
      icon: 'stop',
      label: 'Stop'
    })
  }

  return button({
    onClick: onStart,
    icon: 'play',
    label: 'Run'
  })
}

function resetButton (state, send) {
  return button({
    onClick: () => send('resetLevel'),
    label: 'Reset'
  })
}

function nextLevelButton (state, send) {
  return button({
    onClick: () => send('nextLevel'),
    label: 'Next Level'
  })
}

function prevLevelButton (state, send) {
  return button({
    onClick: () => send('prevLevel'),
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
