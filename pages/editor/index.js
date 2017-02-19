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

const prefix = sf`
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
  const playButtonHtml = playButtonView({
    isRunning: clock.isRunning,
    onStart: () => {
      send('runtime:commitCode', { code: editor.code, groupId: 1 })
      send('clock:start')
    },
    onStop: () => init()
  })

  const speedSliderHtml = speedSliderView({
    min: 100,
    max: 1000,
    intervalDuration: clock.intervalDuration,
    onChange: (value) => send('clock:setIntervalDuration', { intervalDuration: value })
  })

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

  const pageHtml = panelGroup.component(state, prev, send)('editor-page', {
    props: {
      panelViews: [
        gameHtml,
        blocklyHtml
      ]
    }
  })

  return html`
    <div class="${prefix}" onload=${init}>
      <h1 class="header">
        Robotopia
      </h1>
      <div class="content">
        ${pageHtml}
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

module.exports = editorView
