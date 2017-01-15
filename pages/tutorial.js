const html = require('choo/html')
const sf = require('sheetify')
const gameView = require('../elements/game/index')
const tutorialDialog = require('../elements/tutorialDialog')
const goalProgress = require('../elements/goalProgress')
const blocklyWidget = require('../elements/blockly')
const { speedSliderView, playButtonView } = require('../elements/runtime-controls')

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

const blocklyView = blocklyWidget()

const tutorialView = ({ game, clock, editor, tutorial, location }, prev, send) => {
  const playButtonHtml = playButtonView({
    running: clock.isRunning,
    onStart: () => {
      send('clock:start')
    },
    onStop: () => send('clock:stop')
  })

  const speedSliderHtml = speedSliderView({
    min: 100,
    max: 1000,
    intervalDuration: clock.intervalDuration,
    onChange: (value) => send('clock:setIntervalDuration', { intervalDuration: value })
  })

  console.log('render level', tutorial.level && tutorial.level.editor.toolbox)

  const blocklyHtml = blocklyView({
    toolbox: tutorial.level !== null ? tutorial.level.editor.toolbox : editor.toolbox,
    workspace: editor.workspace,
    onChange: ({ code, workspace }) => {
      send('runtime:commitCode', { code })
      send('editor:update', { code, workspace })
    }
  })

  const gameHtml = gameView({
    state: game,
    progress: clock.progress
  })

  return html`
    <main onload=${initTutorial} class="${mainPrefix}">
      <div class="header-bar">
        <div class="${controlsPrefix}">
          ${playButtonHtml}
          ${speedSliderHtml}
        </div>
      </div>
      <div class=${`${contentPrefix} content`}>
        <div class="column">
          ${blocklyHtml}
        </div>
        <div class="divider"></div>
        <div class="column">
          ${gameHtml}
        </div>
      </div>
    </main>
  `

  function initTutorial () {
    send('tutorial:loadLevel', { name: location.params.level })
  }
}

/*
 ${tutorialDialog(state.game, state.level, state.workspace, send)}
 ${goalProgress(state.game, state.level, state.workspace)}
*/

module.exports = tutorialView
