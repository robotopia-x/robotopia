/* globals Path2D */
const _ = require('lodash')
const assets = require('../../lib/utils/assets')
const { getAllEntities, getEntity } = require('../../lib/game')
const { RENDERER } = require('../../lib/utils/types')
const { ORIENTATION } = require('../../lib/utils/types')

const TILE_HEIGHT = 80
const TILE_WIDTH = 100

function render (ctx, state, progress) {
  const { tiles } = state.current

  ctx.save()
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2

  moveOrigin(ctx, tiles)
  renderTiles(ctx, tiles)
  renderEntities(ctx, state.current, state.prev, progress)

  ctx.restore()
}

// move origin to top left by half the size of the board so the game will be centered
function moveOrigin (ctx, tiles) {
  const offsetX = -(tiles[0].length / 2) * TILE_WIDTH
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

  if (entity.collector) {
    renderCarriesResource(ctx, entity, prevEntity, progress)
  }

  if (entity.task) {
    renderTask(ctx, entity, prevEntity, progress)
  }

  if (entity.worker) {
    renderWorker(ctx, entity, prevEntity, progress)
  }
}

function interpolate (current, prev, progress) {
  return prev + (current - prev) * progress
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

const HEALTH_BAR_WIDTH = 75
const HEALTH_BAR_HEIGHT = 10
const HEALTH_BAR_BACKGROUND = '#fff'
const HEALTH_BAR_COLOR = '#00ff00'

function renderHealth (ctx, current, prev, progress) {
  ctx.fillStyle = 'red'

  const x = (interpolate(current.position.x, prev.position.x, progress) + 0.5) * TILE_WIDTH - (HEALTH_BAR_WIDTH / 2) // align in center
  const y = interpolate(current.position.y, prev.position.y, progress) * TILE_HEIGHT + 20

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
  ctx.strokeRect(x, y, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT)

  ctx.restore()
}

const HAS_RESOURCE_RADIUS = 15
const HAS_RESOURCE_COLOR = '#2245e3'

function renderCarriesResource (ctx, current, prev, progress) {
  // only render if robot carries resource
  if (current.collector.hasResource && current.position.rotation !== ORIENTATION.BACK) {
    let x = 0
    let y = 0

    if (current.position.rotation === ORIENTATION.FRONT) {
      x = (interpolate(current.position.x, prev.position.x, progress) + 0.5) * TILE_WIDTH
      y = interpolate(current.position.y, prev.position.y, progress) * TILE_HEIGHT + 115
    }

    if (current.position.rotation === ORIENTATION.RIGHT) {
      x = (interpolate(current.position.x, prev.position.x, progress) + 0.5) * TILE_WIDTH + 25
      y = interpolate(current.position.y, prev.position.y, progress) * TILE_HEIGHT + 115
    }

    if (current.position.rotation === ORIENTATION.LEFT) {
      x = (interpolate(current.position.x, prev.position.x, progress) + 0.5) * TILE_WIDTH - 25
      y = interpolate(current.position.y, prev.position.y, progress) * TILE_HEIGHT + 115
    }

    ctx.save()

    ctx.fillStyle = HAS_RESOURCE_COLOR
    ctx.beginPath()
    ctx.arc(x, y, HAS_RESOURCE_RADIUS, 0, 2 * Math.PI)
    ctx.fill()

    ctx.restore()
  }
}

const TASK_RING_WIDTH = 15
const TASK_CIRCLE_WIDTH = 25
const TASK_PADDING = 10

function renderTask (ctx, current, prev, progress) {
  const assignedWorkers = interpolate(current.task.assignedWorkers, prev.task.assignedWorkers, progress)
  const requiredWorkers = current.task.requiredWorkers

  const percentage = assignedWorkers / requiredWorkers
  const angle = percentage * Math.PI * 2
  const x = (current.position.x + 0.5) * TILE_WIDTH
  const y = (current.position.y + 1.55) * TILE_HEIGHT * 1.25

  ctx.save()
  ctx.fillStyle = current.task.name

  // skew circle to make it look like a side it's viewed from the side
  ctx.scale(1, 0.8)

  if (percentage > 0) {
    // draw ring
    ctx.beginPath()
    ctx.arc(x, y, (TASK_CIRCLE_WIDTH / 2) + TASK_RING_WIDTH + TASK_PADDING, 0, angle, false) // outer (filled)
    ctx.arc(x, y, (TASK_CIRCLE_WIDTH / 2) + TASK_PADDING, percentage === 1 ? 0 : angle, Math.PI * 2, true) // inner (unfills it)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  // draw circle
  ctx.beginPath()
  ctx.arc(x, y, (TASK_CIRCLE_WIDTH / 2), 0, Math.PI * 2, true)
  ctx.fill()
  ctx.stroke()

  ctx.restore()
}

const WORKER_ICON_SIZE = 50

function renderWorker (ctx, current, prev, progress) {
  if (current.worker.assignedTask === null) {
    return
  }

  const x = (interpolate(current.position.x, prev.position.x, progress) + 0.5) * TILE_WIDTH - (WORKER_ICON_SIZE / 2)
  const y = interpolate(current.position.y, prev.position.y, progress) * TILE_HEIGHT - 35

  const scaleFactor = WORKER_ICON_SIZE / 512

  ctx.save()

  ctx.fillStyle = current.worker.assignedTask.type
  ctx.translate(x, y)

  // adapted from ionicions: https://raw.githubusercontent.com/driftyco/ionicons/master/src/flash.svg
  ctx.beginPath()
  ctx.moveTo(10, 29)
  ctx.lineTo(24, 29)
  ctx.lineTo(19, 48)
  ctx.lineTo(42, 22)
  ctx.lineTo(27, 22)
  ctx.lineTo(32, 3)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  ctx.restore()
}

module.exports = {
  render
}
