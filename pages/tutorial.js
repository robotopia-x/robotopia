const html = require('choo/html')
const sf = require('sheetify')
const gameView = require('../elements/game/index')
const tutorialDialogView = require('../elements/tutorial/tutorialDialog')
const { goalProgressView } = require('../elements/goal-progress')
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
      position: relative;
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
  let toolbox = editor.toolbox
  let goalProgressHtml

  if (prev !== null && location.params.level !== prev.location.params.level) {
    initLevel()
  }

  if (tutorial.level !== null) {
    toolbox = tutorial.level.editor.toolbox

    goalProgressHtml = goalProgressView({
      display: !tutorial.isStoryModalOpen,
      game: game.prev,
      goals: tutorial.level.goals,
      workspace: editor.workspace
    })
  }

  const playButtonHtml = playButtonView({
    isRunning: clock.isRunning,
    onStart: () => {
      send('game:loadGameState', { loadState: tutorial.level.game })
      send('runtime:destroyRobot', { id: 'ROBOT' })
      send('runtime:createRobot', { id: 'ROBOT', groupId: 1 })
      send('clock:start')
    },
    onPause: () => send('clock:stop')
  })

  const speedSliderHtml = speedSliderView({
    min: 100,
    max: 1000,
    intervalDuration: clock.intervalDuration,
    onChange: (value) => send('clock:setIntervalDuration', { intervalDuration: value })
  })

  const blocklyHtml = blocklyView({
    toolbox,
    workspace: editor.workspace,
    onChange: ({ code, workspace }) => {
      send('runtime:commitCode', { code, groupId: 1 })
      send('editor:update', { code, workspace })
    }
  })

  const gameHtml = gameView({
    state: game,
    progress: clock.progress
  })

  return html`
    <main onload=${initLevel} class="${mainPrefix}" foo=${location.params.level}>
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
          ${tutorialDialogView(game, tutorial, editor.workspace, send)}
          ${goalProgressHtml} 
        </div>
    </main>
  `

  function initLevel () {
    send('clock:stop')
    send('tutorial:loadLevel', { name: location.params.level })
  }
}

module.exports = tutorialView
