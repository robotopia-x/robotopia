const P2P_CONFIG = {
  hubUrl: 'https://signalhub.perguth.de:65300/'
  // hubUrl: 'localhost:8080'
}

const _ = require('lodash')
const choo = require('choo')
const assets = require('@robotopia/assets-loader')
const clock = require('./models/clock')()
const runtime = require('./models/runtime')()
const gameModel = require('./models/game')
const editorModel = require('./models/editor')
const panelGroupModel = require('./components/panel-group').model
const levelModel = require('./models/tutorial')
const clientModel = require('./models/client')(P2P_CONFIG)
const presenterModel = require('./models/presenter')(P2P_CONFIG)
const prepfight = require('action-overlay')('prepfight')

const app = choo()

// app models
app.model(clock.model)
app.model(runtime.model)
app.model(gameModel)
app.model(editorModel)
app.model(levelModel)
app.model(clientModel)
app.model(presenterModel)
app.model(prepfight.model)

// component models
app.model(panelGroupModel)

app.use({ onStateChange: (state) => runtime.setState(state.game) })

clock.onTick((send) => {
  send('game:beginStep', {}, _.noop)
  send('runtime:step', {}, _.noop)
  send('game:completeStep', {}, _.noop)
  send('tutorial:sendEvent', { type: 'clock', operation: 'tick' }, _.noop)
})

app.router({ default: '/' }, [
  ['/', require('./pages/overview')],
  ['/credits', require('./pages/credits/index')],
  ['/editor', require('./pages/editor')],
  ['/tutorial/:category/:level', require('./pages/tutorial')],
  ['/presenter', require('./pages/presenter')]
])

assets.load({
  WATER_TILE: 'assets/img/tiles/water-tile.png',
  DIRT_TILE: 'assets/img/tiles/dirt-tile.png',
  GRASS_TILE: 'assets/img/tiles/grass-tile.png',
  PLAIN_TILE: 'assets/img/tiles/plain-tile.png',
  STONE_TILE: 'assets/img/tiles/stone-tile.png',
  BLUE_GEM: 'assets/img/resources/gem-blue-splitted.png',
  RED_GEM: 'assets/img/resources/gem-red-splitted.png',
  GREEN_GEM: 'assets/img/resources/gem-green-splitted.png',
  CHEST_FRONT: 'assets/img/chest-front.png',
  CHEST_BACK: 'assets/img/chest-back.png',
  ROBOT_FRONT_TEAM_1: 'assets/robot/robot1-front-sprite.png',
  ROBOT_LEFT_TEAM_1: 'assets/robot/robot1-left-sprite.png',
  ROBOT_BACK_TEAM_1: 'assets/robot/robot1-back-sprite.png',
  ROBOT_RIGHT_TEAM_1: 'assets/robot/robot1-right-sprite.png',
  ROBOT_FRONT_TEAM_2: 'assets/robot/robot2-front-sprite.png',
  ROBOT_LEFT_TEAM_2: 'assets/robot/robot2-left-sprite.png',
  ROBOT_BACK_TEAM_2: 'assets/robot/robot2-back-sprite.png',
  ROBOT_RIGHT_TEAM_2: 'assets/robot/robot2-right-sprite.png',
  BASE: 'assets/img/base.png',
  TOWER: 'assets/img/tower.png'
}).then(() => {
  document.body.appendChild(app.start({ hash: true }))
})
