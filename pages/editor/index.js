/* globals localStorage */
const html = require('choo/html')
const sf = require('sheetify')
const gameView = require('../../elements/game/index')
const blocklyWidget = require('../../elements/blockly')
const { speedSliderView, playButtonView } = require('../../elements/runtime-controls')
const button = require('../../elements/button')
const initialState = require('./initial-state')
const clientDialogView = require('../../elements/client-dialog')
const gameStatsView = require('../../elements/game-stats')

const DEV_MODE = true // set to true to dev on the editor and not be bothered with multiplayer

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

function editorView ({ clock, editor, game, client }, prev, send) {
  const playButtonHtml = playButtonView({
    isRunning: clock.isRunning,
    onStart: () => send('clock:start'),
    onPause: () => send('clock:stop')
  })

  const resetButtonHtml = button({
    label: 'Reset',
    onClick: init
  })

  const speedSliderHtml = speedSliderView({
    min: 100,
    max: 1000,
    intervalDuration: clock.intervalDuration,
    onChange: (value) => send('clock:setIntervalDuration', { intervalDuration: value })
  })

  const commitButtonHtml = button({
    onClick: () => {
      send('client:sendCode', {code: editor.code})
    },
    icon: 'upload',
    label: 'Upload'
  })

  const blocklyHtml = blocklyView({
    toolbox: initialState.editor.toolbox,
    workspace: localStorage.getItem('workspace') || editor.workspace,
    onChange: ({ code, workspace }) => {
      localStorage.setItem('workspace', workspace)
      send('runtime:commitCode', { code, groupId: 1 })
      send('editor:update', { code, workspace })
    }
  })

  const gameHtml = gameView({
    state: game,
    progress: clock.progress
  })

  const clientDialogHtml = clientDialogView({
    client,
    onSetUsername: (username) => send('client:setUsername', { username }),
    onJoinGroup: (groupId) => send('client:joinGroup', { groupId }),
    onDisconnect: () => send('client:disconnect'),
    onDenyRecovery: () => send('client:denyRecovery')
  })

  const gameStatsHtml = gameStatsView({
    game,
    progress: clock.progress
  })

  return html`
    <main class="${mainPrefix}" onload=${init}>
      <div class="header-bar">
        <div class="${controlsPrefix}">
          ${playButtonHtml}
          ${resetButtonHtml}
          ${speedSliderHtml}
          ${commitButtonHtml}
        </div>
      </div>      
      <div class=${`${contentPrefix} content`}>
        <div class="column">
          ${blocklyHtml}
        </div>
        <div class="divider"></div>
        <div class="column">
          ${gameHtml}
          ${gameStatsHtml}
        </div>
      </div>
      ${!DEV_MODE ? clientDialogHtml : ''}
    </main>
  `

  function init () {
    send('clock:stop')
    send('runtime:reset')
    send('game:loadGameState', { loadState: initialState.game })
    send('game:initializeResourceSpots', { numberOfSpots: 20 })
  }
}

module.exports = editorView
