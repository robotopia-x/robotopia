const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const assets = require('../utils/assets')
const canvasView = require('./canvas')
const gameEngine = require('../game/game-engine')

const TILE_HEIGHT = 80
const TILE_WIDTH = 100

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
  }
`

const gameView = (state, prev, send) => html`
    <div class="${prefix}">
      ${canvasView((ctx, width, height, changed) => render(ctx, width, height, changed, state, send))}
    </div>
  `

function render (ctx, width, height, changed, state, send) {
  send('updateCanvas', { canvas: changed }, () => {})

  const newXPos = state.canvas.pan.x + (state.canvas.zoom / 2 - width / 2)
  const newYPos = state.canvas.pan.y + (state.canvas.zoom / 2 - height / 2)
  const newGameWidth = width / state.canvas.zoom
  const newGameHeight = height / state.canvas.zoom

  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.scale(newGameWidth, newGameHeight)
  ctx.translate(newXPos, newYPos)

  renderTiles(ctx, state.game.tiles)
  renderEntities(ctx, state.game)

  ctx.restore()
}

function renderTiles (ctx, tiles) {
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
      ctx.drawImage(getTileImage(tiles[y][x]), x * TILE_WIDTH, y * TILE_HEIGHT + 40)
    }
  }
}

function renderEntities (ctx, state) {
  const sortedEntities = _.sortBy(gameEngine.getAllEntities(['position', 'sprite'], state), [(e) => {
    return [e.position.x, e.position.y]
  }])

  _.forEach(sortedEntities, (entity) => {
    const { position, sprite } = entity
    ctx.drawImage(assets.store[sprite.type], position.x * TILE_WIDTH, position.y * TILE_HEIGHT)
  })
}

function getTileImage (type) {
  return {
    0: assets.store.PLAIN_BLOCK,
    1: assets.store.GRASS_BLOCK,
    2: assets.store.WATER_BLOCK,
    3: assets.store.STONE_BLOCK
  }[type]
}

module.exports = gameView
