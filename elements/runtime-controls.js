const html = require('choo/html')
const button = require('./button')

function speedSliderView ({
  max, min, intervalDuration,
  onChange
}) {
  // map intervalDuration to percentage, more speed => smaller interval
  const percentage = (1 - (intervalDuration - min) / (max - min))

  return html`
      <input
         type="range"
         min="0" max="1"
         step="0.1"
         value="${percentage}"
         oninput=${(evt) => onChange((1 - evt.target.value) * (max - min) + min)} />`
}

function playButtonView ({
  isRunning,
  onStart, onStop
}) {
  if (isRunning) {
    return button({
      onClick: onStop,
      icon: 'stop',
      label: 'Reset',
      additionalClasses: 'play-button'
    })
  }

  return button({
    onClick: onStart,
    icon: 'play',
    label: 'Run',
    additionalClasses: 'play-button'
  })
}

module.exports = {
  speedSliderView,
  playButtonView
}
