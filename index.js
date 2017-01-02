require('./lib/utils/lodash-extension')
require('./lib/blockly')

const assets = require('./lib/utils/assets')
const choo = require('choo')
const ideModel = require('./models/ide')
const clockModel = require('./models/clock').getModel()
const gameModel = require('./models/game')
const robotRuntime = require('./lib/utils/robot-runtime')

const app = choo()

app.model(ideModel)
app.model(clockModel)
app.model(gameModel)

app.use({ onStateChange: (state) => robotRuntime.onStateChange(state.game) })

app.router({ default: '/' }, [
  ['/', require('./pages/main')]
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
  BASE: '../assets/img/spawn.png'
}).then(() => {
  document.body.appendChild(app.start())
})
