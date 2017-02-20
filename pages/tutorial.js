const html = require('choo/html')
const pageLayout = require('../elements/page-layout')
const gameRunnerView = require('../elements/game-runner')
const tutorialDialogView = require('../elements/tutorial/tutorialDialog')
const blocklyWidget = require('../elements/blockly')
const { speedSliderView, playButtonView } = require('../elements/runtime-controls')
const { instructionView } = require('../elements/instructions')

const blocklyView = blocklyWidget()

const tutorialView = (state, prev, send) => {
  const { game, clock, editor, tutorial, location } = state

  // we need to check if level param has changed because onLoad will not be triggered if tutorial page
  // has already been loaded
  if (prev !== null && location.params.level !== prev.location.params.level) {
    init()
  }

  const instructionHtml = instructionView(game, tutorial)

  const blocklyHtml = blocklyView({
    toolbox: tutorial.level && tutorial.level.editor.toolbox,
    workspace: tutorial.level && tutorial.level.editor.workspace,
    onChange: ({ code, workspace }) => {
      send('runtime:commitCode', { code, groupId: 1 })
      send('editor:update', { code, workspace })
    }
  })
  
  const gameRunnerHtml = gameRunnerView({
    game, clock,
    onStart: () => {
      send('game:loadGameState', { loadState: tutorial.level.game })
      if (tutorial.level.hasOwnProperty('resources') && !isNaN(tutorial.level.resources) && tutorial.level.resources > 0) {
        send('game:initializeResourceSpots', { numberOfSpots: 10 })
      }
      send('runtime:destroyRobot', { id: 'ROBOT' })
      send('runtime:createRobot', { id: 'ROBOT', groupId: 1 })
      send('clock:start')
      send('tutorial:resetEvents')
    },
    onStop: () => {
      send('clock:stop')
      send('runtime:destroyRobot', { id: 'ROBOT' })
      send('game:loadGameState', { loadState: tutorial.level.game })
    },
    onChangeSpeed: (value) => send('clock:setIntervalDuration', { intervalDuration: value })
  })

  const pageLayoutHtml = pageLayout({
    id: 'tutorial-page',
    context: [state, prev, send],
    panels: [
      { view: instructionHtml, size: 1 },
      { view: gameRunnerHtml, size: 2 },
      { view: blocklyHtml, size: 2 }
    ]
  })

  return html`
    <div onload=${init}>
      ${pageLayoutHtml}
      ${tutorialDialogView(game, tutorial, editor.workspace, send)}
    </div>
  `

  function init () {
    send('clock:stop')
    send('tutorial:loadLevel', { name: location.params.level })
  }
}

module.exports = tutorialView
