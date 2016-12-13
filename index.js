require('./src/utils/lodash-extension')
require('./src/blockly')

const assets = require('./src/utils/assets')
const choo = require('choo')
const ideModel = require('./src/model')
const gameModel = require('./src/game/model')

const app = choo()

app.model(ideModel)
app.model(gameModel)

app.router((route) => [
  route('/', require('./src/components/main'))
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
  document.body.innerHTML = ''
  document.body.appendChild(app.start())
})
