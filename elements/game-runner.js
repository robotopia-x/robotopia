const html = require('choo/html')
const sf = require('sheetify')
const gameView = require('./game')
const { speedSliderView, playButtonView } = require('./runtime-controls')

const gameRunnerPrefix = sf`
  :host {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host > .controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid grey;
  }

  :host > .game {
    height: calc(100% - 50px);
  }
`

function gameRunnerView ({
  game, clock,
  onStart, onStop, onChangeSpeed
}) {
  const gameHtml = gameView({
    state: game,
    progress: clock.progress
  })

  const playButtonHtml = playButtonView({
    isRunning: clock.isRunning,
    onStart,
    onStop
  })

  const speedSliderHtml = speedSliderView({
    min: 100,
    max: 1000,
    intervalDuration: clock.intervalDuration,
    onChange: onChangeSpeed
  })

  return html`
    <div class="${gameRunnerPrefix}">
      <div class="controls">
        ${playButtonHtml}
        ${speedSliderHtml}
      </div>
      <div class="game">
         ${gameHtml}
      </div>
    </div>
  `
}

module.exports = gameRunnerView
