require('./lib/utils/lodash-extension')
require('./lib/blockly')

const P2P_CONFIG = {
  hubUrl: 'http://localhost:8042'
}

const _ = require('lodash')
const choo = require('choo')
const assets = require('./lib/utils/assets')
const clock = require('./models/clock')()
const runtime = require('./models/runtime')()
const gameModel = require('./models/game')
const editorModel = require('./models/editor')
const level = require('./models/tutorial/index')
const client = require('./models/client')(P2P_CONFIG)
const presenter = require('./models/presenter')(P2P_CONFIG)

const app = choo()

app.model(clock.model)
app.model(runtime.model)
app.model(gameModel)
app.model(editorModel)
app.model(level)
app.model(client)
app.model(presenter)

app.use({ onStateChange: (state) => runtime.setState(state.game) })

clock.onTick((send) => {
  send('game:beginStep', {}, _.noop)
  send('runtime:step', {}, _.noop)
  send('game:completeStep', {}, _.noop)
})

app.router([
  ['/editor', require('./pages/editor')],
  ['/tutorial/:level', require('./pages/tutorial')],
  ['/presenter', require('./pages/presenter')]
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
