require('./lib/utils/lodash-extension')
require('./lib/blockly')

var globalConfig = {
  hub: 'http://localhost:8042',
  MAX: {
    codeHistory: 5
  }
}

const _ = require('lodash')
const choo = require('choo')
const assets = require('./lib/utils/assets')
const ideModel = require('./models/ide')
const gameModel = require('./models/game')
const clock = require('./models/clock').create()
const runtime = require('./models/runtime').create()
const level = require('./models/level')
const p2pPresenter = require('./models/P2PPresenter')(globalConfig)
const presenter = require('./models/presenter')(globalConfig)

const app = choo()

app.model(ideModel)
app.model(gameModel)
app.model(clock.model)
app.model(runtime.model)
app.model(level)
app.model(p2pPresenter)
app.model(presenter)

app.use({ onStateChange: (state) => runtime.setState(state.game) })

clock.onTick((send) => {
  send('game:beginStep', {}, _.noop)
  send('runtime:step', {}, _.noop)
  send('game:completeStep', {}, _.noop)
})

app.router({ default: '/editor' }, [
  ['/editor', require('./pages/main')],
  ['/tutorial', require('./pages/tutorial')],
  ['/presenter', require('./pages/presenter')(globalConfig)],
  ['/404', require('./pages/error')(globalConfig)],
  ['/dashboard', require('./pages/dashboard')(globalConfig)]
])

assets.load({
  GRASS_BLOCK: '../assets/img/grass-block.png',
  PLAIN_BLOCK: '../assets/img/plain-block.png',
  WATER_BLOCK: '../assets/img/water-block.png',
  STONE_BLOCK: '../assets/img/stone-block.png',
  GEM: '../assets/img/gem-blue.png',
  MARKER: '../assets/img/star.png',
  ROBOT_FRONT: '../assets/img/robot-front.png',
  ROBOT_LEFT: '../assets/img/robot-left.png',
  ROBOT_BACK: '../assets/img/robot-back.png',
  ROBOT_RIGHT: '../assets/img/robot-right.png',
  BASE: '../assets/img/spawn.png',
  TOWER: '../assets/img/tower.png'
}).then(() => {
  document.body.appendChild(app.start())
})
