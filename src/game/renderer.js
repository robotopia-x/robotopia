const _ = require('lodash')
const assets = require('../utils/assets')
const gameEngine = require('../utils/game')
const { RENDERER } = require('../utils/types')

const TILE_HEIGHT = 80
const TILE_WIDTH = 100

function render (ctx, state) {
  const { tiles } = state

  moveOrigin(ctx, tiles)
  renderTiles(ctx, tiles)
  renderEntities(ctx, state)
}

// move origin to top left by half the size of the board so the game will be centered
function moveOrigin (ctx, tiles) {
  const offsetX = -(tiles.length / 2) * TILE_WIDTH
  const offsetY = -(tiles.length / 2) * TILE_HEIGHT
  ctx.translate(offsetX, offsetY)
}

function renderTiles (ctx, tiles) {
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
      ctx.drawImage(assets.store[getTileImageType(tiles[y][x])], x * TILE_WIDTH, y * TILE_HEIGHT + 40)
    }
  }
}

function getTileImageType (type) {
  return {
    0: 'PLAIN_BLOCK',
    1: 'GRASS_BLOCK',
    2: 'WATER_BLOCK',
    3: 'STONE_BLOCK'
  }[type]
}

function renderEntities (ctx, state) {
  const entities = gameEngine.getAllEntities(['renderer'], state)
  _.each(entities, (entity) => renderEntity(ctx, entity))
}

function renderEntity (ctx, entity) {
  const { type, data } = entity.renderer

  switch (type) {
    case RENDERER.SIMPLE:
      simpleRenderer(ctx, data, entity)
      break

    case RENDERER.ROTATING:
      rotatingRenderer(ctx, data, entity)
      break

    default:
      throw new Error(`Unknown renderer type: ${type}`)
  }
}

function simpleRenderer (ctx, { sprite }, { position }) {
  drawSprite(ctx, sprite, position.x, position.y)
}

function rotatingRenderer (ctx, { sprites }, { position }) {
  drawSprite(ctx, sprites[position.rotation], position.x, position.y)
}

function drawSprite (ctx, type, x, y) {
  ctx.drawImage(assets.store[type], x * TILE_WIDTH, y * TILE_HEIGHT)
}

module.exports = {
  render
}
