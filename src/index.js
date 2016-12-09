// TODO: replace this later with require
if (!window.__loaded) {
  document.write('<script src="./node_modules/blockly/blockly_compressed.js"></script>')
  document.write('<script src="./node_modules/blockly/blocks_compressed.js"></script>')
  document.write('<script src="./node_modules/blockly/msg/js/en.js"></script>')
  document.write('<script src="./node_modules/blockly/javascript_compressed.js"></script>')
  document.write('<script src="../lib/blocks.js"></script>')
  document.write('<script src="../lib/javascript-commands.js" onload="startApp()"}></script>')
}
window.__loaded = true

require('./utils/lodash-extension')

const assets = require('./utils/assets')
const choo = require('choo')
const hotModuleReplacement = require('./utils/hot-module-replacement')
const ideModel = require('./model')
const gameModel = require('./game/model')

const app = choo()

app.model(ideModel)
app.model(gameModel)

app.router((route) => [
  route('/', require('./components/main'))
])

hotModuleReplacement(app)

window.startApp = () => {
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
}
