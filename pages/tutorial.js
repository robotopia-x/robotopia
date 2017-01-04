const html = require('choo/html')
const sf = require('sheetify')
const gameView = require('../elements/game/index')
const winningCondition = require('../elements/winningCondition')
const blocklyView = require('../elements/blockly')
const {
  spawnButton,
  speedSlider,
  playButtonView,
  resetButton,
  nextLevelButton,
  prevLevelButton } = require('../elements/runtime-controls')

const mainPrefix = sf`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    :host .header-bar {
      height: 50px;
      display: flex;
      padding: 20px;
      align-items: center;
      background: #404040;
    }

    :host .content {
      height: 100%;        
    }
`

const contentPrefix = sf`
    :host {
      display: flex;
      flex-direction: row;
    }

    :host > .divider {
      background: #404040;
      width: 10px;
      height: 100%;
      cursor: ew-resize;
      flex-shrink: 0;
    }
    
    :host > .divider:hover {
      background: #848484;
    }

    :host > .column {
      height: 100%;
      width: 50%;
    }
`

const controlsPrefix = sf`
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
const tutorialView = (state, prev, send) => {
  return html`
  <main class="${mainPrefix}">
    <div class="header-bar">
      <div class="${controlsPrefix}">
        ${playButtonView(state, send)}
        ${speedSlider(state, send)}
        ${spawnButton(state, send)}
        ${prevLevelButton(state, send)}        
        ${resetButton(state, send)}
        ${nextLevelButton(state, send)}
      </div>
    </div>
    <div class=${`${contentPrefix} content`}>
      <div class="column">
        ${blocklyView(state, prev, send)}
      </div>
      <div class="divider"></div>
      <div class="column">
        ${gameView(state.game, state.clock.progress)}
      </div>
      <div class="overlay">
        ${winningCondition(state, send)}
    </div>
    </div>
  </main>
`
}

module.exports = tutorialView
