const html = require('choo/html')
const sf = require('sheetify')
const pageLayout = require('../elements/page-layout')
const gameView = require('../elements/game/index')
const tutorialDialogView = require('../elements/tutorial/tutorialDialog')
const { goalProgressView } = require('../elements/goal-progress')
const blocklyWidget = require('../elements/blockly')
const { speedSliderView, playButtonView } = require('../elements/runtime-controls')

const blocklyView = blocklyWidget()

const tutorialView = (state, prev, send) => {
  const { game, clock, editor, tutorial, location } = state
  let toolbox = editor.toolbox
  let goalProgressHtml

  // we need to check if level param has changed because onLoad will not be triggered if tutorial page
  // has already been loaded
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
    onStop: () => {
      send('clock:stop')
      send('runtime:destroyRobot', { id: 'ROBOT' })
      send('game:loadGameState', { loadState: tutorial.level.game })
    }
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

  const pageLayoutHtml = pageLayout({
    id: 'tutorial-page',
    context: [state, prev, send],
    header: {
      left: [
        playButtonHtml,
        speedSliderHtml
      ]
    },

    panels: [
      blocklyHtml,
      [
        gameHtml,
        goalProgressHtml
      ]
    ]
  })

  return html`
    <div onload=${initLevel}>
      ${pageLayoutHtml}
      ${tutorialDialogView(game, tutorial, editor.workspace, send)}
    </div>
  `

  function initLevel () {
    send('clock:stop')
    send('tutorial:loadLevel', { name: location.params.level })
  }
}

module.exports = tutorialView
