const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const assets = require('../utils/assets')
const canvasView = require('./canvas')
const gameEngine = require('../game/game-engine')

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
  }
`

const gameView = (state, prev, send) => html`
    <div class="${prefix}">
      ${canvasView(_.partial(render, state))}
    </div>
  `

function render (state, ctx, cWidth, cHeight) {
  ctx.save()
  ctx.scale(cWidth / 1000, cHeight / 1000)



  ctx.clearRect(0, 0, cWidth, cHeight)
  drawGrid(state, ctx, cWidth, cHeight)

  _.forEach(gameEngine.getAllEntities(state, 'position'), (entity) => {
    const {position: { x, y }, id} = entity
    const img = id === 'robot' ? 'ROBOT' : 'GEM'

    ctx.drawImage(assets.store[img], x * 100, y * 100)
  })

  ctx.restore()
}

function drawGrid (state, ctx, cWidth, cHeight) {
  const gameGrid = state.tiles

  for (let y = 0; y < gameGrid.length; y++) {
    for (let x = 0; x < gameGrid[y].length; x++) {
      ctx.drawImage(assets.store.PLAIN_BLOCK, x * 100, y * 100)
    }
  }
}

module.exports = gameView
