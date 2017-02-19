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
const panelGroup = require('../../components/panel-group')

const DEV_MODE = true // set to true to dev on the editor and not be bothered with multiplayer

const editorPrefix = sf`
  :host {
    width: 100vw;
    height: 100vh;
    display: flexbox;       
  }
    
  :host > .header {
    display: flex;
    height: 65px;
    margin: 0;
    padding: 25px 0 0 100px;
    font-size: 26px;
    font-weight: normal;    
    color: #fff;
    background: #03A9F4;    
    background-image: url('./assets/icons/logo.svg');
    background-size: 50px;
    background-position: 45px 5px;
    background-repeat: no-repeat;    
  }
    
  :host > .content {
    height: calc(100% - 65px)
  }
`

const blocklyView = blocklyWidget()

function editorView (state, prev, send) {
  const { clock, editor, game, client } = state

  const commitButtonHtml = button({
    onClick: () => {
      send('client:sendCode', { code: editor.code })
    },
    icon: 'upload',
    label: 'Upload'
  })

  const blocklyHtml = blocklyView({
    toolbox: initialState.editor.toolbox,
    workspace: localStorage.getItem('workspace') || initialState.editor.workspace || editor.workspace,
    onChange: ({ code, workspace }) => {
      localStorage.setItem('workspace', workspace)
      send('editor:update', { code, workspace })
    }
  })

  const gameRunnerHtml = gameRunnerView({
    game, clock,
    onStart: () => {
      send('runtime:commitCode', { code: editor.code, groupId: 1 })
      send('clock:start')
    },
    onStop: init,
    onChangeSpeed: (value) => send('clock:setIntervalDuration', { intervalDuration: value })
  })

  const clientDialogHtml = clientDialogView({
    client,
    onSetUsername: (username) => send('client:setUsername', { username }),
    onJoinGroup: (groupId) => send('client:joinGroup', { groupId }),
    onDisconnect: () => send('client:disconnect'),
    onDenyRecovery: () => send('client:denyRecovery')
  })

  const contentHtml = panelGroup.component(state, prev, send)('editor-page', {
    props: {
      panelViews: [
        gameRunnerHtml,
        blocklyHtml
      ]
    }
  })

  return html`
    <div class="${editorPrefix}" onload=${init}>
      <h1 class="header">
        Robotopia
      </h1>
      <div class="content">
        ${contentHtml}
      </div>
      ${DEV_MODE ? null : clientDialogHtml}
    </div>
  `

  function init () {
    send('clock:stop')
    send('runtime:reset')
    send('game:loadGameState', { loadState: initialState.game })
    send('game:initializeResourceSpots', { numberOfSpots: 10 })
  }
}

const gameRunnerPrefix = sf`
  :host {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column
  }
  
  :host > .controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid grey;
  }
  
  :host > .game {   
    height: calc(100% - 50px)
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
    onStart, onStop
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

module.exports = editorView
