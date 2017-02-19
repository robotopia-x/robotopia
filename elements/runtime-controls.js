const html = require('choo/html')
const sf = require('sheetify')
const button = require('./button')

const speedSliderPrefix = sf`
  :host {
   margin: 10px;
   display: flex-box;
   flex-direction: row;
  }
  
  :host:after {
    content: '';
    width: 30px;
    height: 30px;
    background: red;     
  }
`

function speedSliderView ({
  max, min, intervalDuration,
  onChange
}) {
  // map intervalDuration to percentage, more speed => smaller interval
  const percentage = (1 - (intervalDuration - min) / (max - min))

  return html`
      <div class="${speedSliderPrefix}"
        <input
          type="range"
          min="0" max="1"
          step="0.1"
          value="${percentage}"
          oninput=${(evt) => onChange((1 - evt.target.value) * (max - min) + min)} />
      </div>
  `
}

function playButtonView ({
  isRunning,
  onStart, onStop
}) {
  if (isRunning) {
    return button({
      onClick: onStop,
      icon: 'stop',
      label: 'Reset'
    })
  }

  return button({
    onClick: onStart,
    icon: 'play',
    label: 'Run'
  })
}

module.exports = {
  speedSliderView,
  playButtonView
}
