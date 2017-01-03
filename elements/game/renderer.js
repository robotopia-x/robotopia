const _ = require('lodash')
const assets = require('../../lib/utils/assets')
const game = require('../../lib/utils/game')
const { RENDERER } = require('../../lib/utils/types')

const TILE_HEIGHT = 80
const TILE_WIDTH = 100

function render (ctx, state, progress) {
  const { tiles } = state.current

  moveOrigin(ctx, tiles)
  renderTiles(ctx, tiles)
  renderEntities(ctx, state.current, state.prev, progress)
}

// move origin to top left by half the size of the board so the game will be centered
function moveOrigin (ctx, tiles) {
  const offsetX = -(tiles.length / 2) * TILE_WIDTH
  const offsetY = -(tiles[0].length / 2) * TILE_HEIGHT
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
    0: 'WATER_BLOCK',
    1: 'PLAIN_BLOCK',
    2: 'GRASS_BLOCK',
    3: 'STONE_BLOCK'
  }[type]
}

function renderEntities (ctx, state, prev, progress) {
  const entities = game.getAllEntities(['renderer'], state)

  _(entities)
  .sortBy(['position.y', 'position.x'])
  .map((entity) => combineWithPrevEntityState(prev, entity))
  .each(([entity, prevEntity]) => {
    renderEntity(ctx, entity, prevEntity, progress)
  })
}

function combineWithPrevEntityState (prev, entity) {
  if (!prev) {
    return [entity, undefined]
  }

  const prevEntity = game.getEntity(entity.id, prev)

  return [entity, prevEntity]
}

function renderEntity (ctx, entity, prevEntity, progress) {
  const { type, data } = entity.renderer

  switch (type) {
    case RENDERER.SIMPLE:
      simpleRenderer(ctx, data, entity)
      break

    case RENDERER.ROTATING:
      rotatingRenderer(ctx, data, entity, prevEntity, progress)
      break

    default:
      throw new Error(`Unknown renderer type: ${type}`)
  }
}

function simpleRenderer (ctx, { sprite }, { position }, progress) {
  drawSprite(ctx, sprite, position.x, position.y)
}

function rotatingRenderer (ctx, { sprites }, current, prev, progress) {
  let x, y

  if (prev) {
    x = prev.position.x + (current.position.x - prev.position.x) * progress
    y = prev.position.y + (current.position.y - prev.position.y) * progress
  } else {
    x = current.position.x
    y = current.position.y
  }

  drawSprite(ctx, sprites[current.position.rotation], x, y)
}

function drawSprite (ctx, type, x, y) {
  ctx.drawImage(assets.store[type], x * TILE_WIDTH, y * TILE_HEIGHT)
}

module.exports = {
  render
}
