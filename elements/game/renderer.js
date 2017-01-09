const _ = require('lodash')
const assets = require('../../lib/utils/assets')
const { getAllEntities, getEntity } = require('../../lib/game/index')
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
  const entities = getAllEntities('id', state)

  _(entities)
  .sortBy(['position.y', 'position.x'])
  .map((entity) => combineWithPrevEntityState(prev, entity))
  .each(([entity, prevEntity]) => {
    renderEntity(ctx, entity, prevEntity, progress)
  })
}

function combineWithPrevEntityState (prev, entity) {
  if (!prev) {
    return [entity, entity]
  }

  const prevEntity = getEntity(entity.id, prev)

  if (!prevEntity) {
    return [entity, entity]
  }

  return [entity, prevEntity]
}

function renderEntity (ctx, entity, prevEntity, progress) {
  if (entity.sprite) {
    renderSprite(ctx, entity, prevEntity, progress)
  }

  if (entity.health) {
    renderHealth(ctx, entity, prevEntity, progress)
  }
}

function renderSprite (ctx, entity, prevEntity, progress) {
  const { type, data } = entity.sprite

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

function simpleRenderer (ctx, { sprite }, { position }) {
  drawSprite(ctx, sprite, position.x, position.y)
}

function rotatingRenderer (ctx, { sprites }, current, prev, progress) {
  const x = interpolate(current.position.x, prev.position.x, progress)
  const y = interpolate(current.position.y, prev.position.y, progress)

  const sprite = sprites[current.position.rotation]

  if (sprite === undefined) {
    throw new Error(`rotatingRenderer: no sprite defined for rotation = ${current.position.rotation} `)
  }

  drawSprite(ctx, sprite, x, y)
}

function drawSprite (ctx, type, x, y) {
  ctx.drawImage(assets.store[type], x * TILE_WIDTH, y * TILE_HEIGHT)
}

function interpolate (current, prev, progress) {
  return prev + (current - prev) * progress
}

const HEALTH_BAR_WIDTH = 75
const HEALTH_BAR_HEIGHT = 15
const HEALTH_BAR_BACKGROUND = '#fff'
const HEALTH_BAR_COLOR = '#00ff00'
const HEALTH_BAR_BORDER = '#000'

function renderHealth (ctx, current, prev, progress) {
  ctx.fillStyle = 'red'

  const x = (interpolate(current.position.x, prev.position.x, progress) + 0.5) * TILE_WIDTH - HEALTH_BAR_WIDTH / 2 // align in center
  const y = interpolate(current.position.y, prev.position.y, progress) * TILE_HEIGHT

  const healthPercentage = interpolate(current.health.current, prev.health.current, progress) / current.health.max

  // don't render health bar if entity has no damage
  if (healthPercentage === 1) {
    return
  }

  ctx.save()

  // draw background
  ctx.fillStyle = HEALTH_BAR_BACKGROUND
  ctx.fillRect(x, y, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT)

  // draw health percentage
  ctx.fillStyle = HEALTH_BAR_COLOR
  ctx.fillRect(x, y, HEALTH_BAR_WIDTH * healthPercentage, HEALTH_BAR_HEIGHT)

  // draw border
  ctx.strokeStyle = HEALTH_BAR_BORDER
  ctx.lineWidth = 2
  ctx.strokeRect(x, y, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT)

  ctx.restore()
}

module.exports = {
  render
}
