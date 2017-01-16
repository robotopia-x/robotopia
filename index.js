require('./lib/utils/lodash-extension')
require('./lib/blockly')

const globalConfig = {
  hub: 'http://localhost:8042',
  MAX: {
    codeHistory: 5
  },
  storagePrefix: 'disrobia',
  connectivityStates: {
    none: 0,
    initialConnect: 1,
    recovering: 2,
    reconnecting: 3,
    connected: 4
  }
}

const _ = require('lodash')
const choo = require('choo')
const assets = require('./lib/utils/assets')
const editorModel = require('./models/editor')
const gameModel = require('./models/game')
const clock = require('./models/clock')()
const runtime = require('./models/runtime').create()
const level = require('./models/tutorial/index')
const p2pPresenter = require('./models/P2PPresenter')(globalConfig)
const presenter = require('./models/presenter')(globalConfig)
const p2pClient = require('./models/P2PClient')(globalConfig)
const client = require('./models/client')(globalConfig)
const storage = require('./models/storage')(globalConfig)
const pageRouter = require('./models/pagerouter')(globalConfig)

const app = choo()

app.model(editorModel)
app.model(gameModel)
app.model(clock.model)
app.model(runtime.model)
app.model(level)
app.model(p2pPresenter)
app.model(presenter)
app.model(p2pClient)
app.model(client)
app.model(storage)
app.model(pageRouter)

app.use({ onStateChange: (state) => runtime.setState(state.game) })

clock.onTick((send) => {
  send('game:beginStep', {}, _.noop)
  send('runtime:step', {}, _.noop)
  send('game:completeStep', {}, _.noop)
})

app.router([
  ['/editor', require('./pages/editor/index')],
  ['/tutorial/:level', require('./pages/tutorial')],
  ['/presenter', require('./pages/presenter')(globalConfig)],
  ['/client', require('./pages/client')(globalConfig)]
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
