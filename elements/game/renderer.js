const _ = require('lodash')
const assets = require('@robotopia/assets-loader')
const { getAllEntities, getEntity, interpolate } = require('@robotopia/choo-game')
const { RENDERER } = require('../../lib/utils/types')
const { ORIENTATION } = require('../../lib/utils/types')

const TILE_HEIGHT = 80
const TILE_WIDTH = 100

// 80 / 100 = 4 / 5 => width has to be divisible by 5
const TILE_DIVISOR = 5

const RESOURCE_COLOR = {
  10: '#2245e3',
  20: '#3acb3a',
  25: '#e4292a'
}

function render (ctx, viewport, state, progress) {
  const { tiles } = state.current

  ctx.save()
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 2

  applyViewportTransforms({
    ctx,
    viewport,
    gameWidth: tiles[0].length,
    gameHeight: tiles.length
  })

  renderTiles(ctx, viewport, tiles)
  renderEntities(ctx, state.current, state.prev, progress)

  ctx.restore()
}

function applyViewportTransforms ({ ctx, viewport, gameWidth, gameHeight }) {
  // move origin to center of canvas
  ctx.translate(viewport.width / 2, viewport.height / 2)

  // apply scale
  const scale = getEvenScale(viewport.scale)
  ctx.scale(scale, scale)

  // center game field
  ctx.translate(-(gameWidth / 2) * TILE_WIDTH, -(gameHeight / 2) * TILE_WIDTH)

  // apply viewport translate
  ctx.translate(viewport.translate.x, viewport.translate.y)
}

// enforce that scale always results in integer tile dimensions (no subpixel rendering)
// if scale doesn't full fill this requirement find the next smaller scale that does
function getEvenScale (scale) {
  const width = Math.floor(scale * TILE_WIDTH)

  if (width % TILE_DIVISOR === 0) {
    return width / TILE_WIDTH
  }

  let divisibleWidth = 0

  while ((divisibleWidth + TILE_DIVISOR) < width) {
    divisibleWidth += TILE_DIVISOR
  }

  return divisibleWidth / TILE_WIDTH
}

function renderTiles (ctx, viewport, tiles) {
  for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
      const image = assets.store[getTileImageType(tiles[y][x])]
      ctx.drawImage(image, x * TILE_WIDTH, y * TILE_HEIGHT + 40)
    }
  }
}

function getTileImageType (type) {
  return {
    1: 'WATER_TILE',
    2: 'DIRT_TILE',
    3: 'GRASS_TILE',
    4: 'PLAIN_TILE',
    5: 'STONE_TILE'
  }[type]
}

function renderEntities (ctx, state, prev, progress) {
  const entities = getAllEntities('id', state)

  _(entities)
    .sortBy(['position.y', 'position.x', 'zIndex'])
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
  if (entity.collectable) {
    renderCollectable(ctx, entity, prevEntity, progress)
  }

  if (entity.sprite && !entity.collectable) {
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

function renderCollectable (ctx, entity, prevEntity, progress) {
  const spritePart = getCollectableSprite(entity.collectable)
  const sprite = entity.sprite.data.sprite

  const image = assets.store[sprite]
  const width = image.width / 3
  const height = image.height
  const { x, y } = entity.position

  ctx.drawImage(image, spritePart * width, 0, width, height, x * TILE_WIDTH, y * TILE_HEIGHT, width, height)
}

function getCollectableSprite ({ value, maxValue }) {
  const parts = maxValue / 3

  if (value < parts) {
    return 2
  }
  if (value < parts * 2) {
    return 1
  }
  return 0
}

function renderSprite (ctx, entity, prevEntity, progress) {
  const { type, data } = entity.sprite

  switch (type) {
    case RENDERER.SIMPLE:
      simpleRenderer(ctx, data, entity)
      break

    case RENDERER.ROBOT:
      robotRenderer(ctx, data, entity, prevEntity, progress)
      break

    default:
      throw new Error(`Unknown renderer type: ${type}`)
  }
}

function simpleRenderer (ctx, { sprite }, { position }) {
  drawSprite(ctx, sprite, position.x, position.y)
}

function robotRenderer (ctx, data, current, prev, progress) {
  const x = interpolate(current.position.x, prev.position.x, progress)
  const y = interpolate(current.position.y, prev.position.y, progress)
  const sprite = getRobotSprite(current)

  if (sprite === undefined) {
    throw new Error(`rotatingRenderer: no sprite defined for rotation = ${current.position.rotation} `)
  }

  const image = assets.store[sprite]
  const width = image.width / 4
  const height = image.height

  let frame

  if (current.position.x === prev.position.x && current.position.y === prev.position.y) {
    frame = 0
  } else {
    frame = Math.floor(4 * progress)
  }

  ctx.drawImage(image, frame * width, 0, width, height, x * TILE_WIDTH, y * TILE_HEIGHT, width, height)
  // drawSprite(ctx, sprite, x, y)
}

function getRobotSprite ({ position, team }) {
  const positionName = ({
    [ORIENTATION.FRONT]: 'ROBOT_FRONT',
    [ORIENTATION.BACK]: 'ROBOT_BACK',
    [ORIENTATION.LEFT]: 'ROBOT_LEFT',
    [ORIENTATION.RIGHT]: 'ROBOT_RIGHT'
  })[position.rotation]

  const teamId = (team && team.id) === 2 ? 2 : 1
  const teamName = `TEAM_${teamId}`

  return `${positionName}_${teamName}`
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

function renderCarriesResource (ctx, current, prev, progress) {
  // maximum size of 20
  const HAS_RESOURCE_RADIUS = Math.min(current.collector.chunk, 25)
  const HAS_RESOURCE_COLOR = RESOURCE_COLOR[HAS_RESOURCE_RADIUS]

  // only render if robot carries resource
  if ((current.collector.hasResource || prev.collector.hasResource) && current.position.rotation !== ORIENTATION.BACK) {
    let x = 0
    let y = 0
    const radius = HAS_RESOURCE_RADIUS * interpolate(current.collector.hasResource, prev.collector.hasResource, progress)

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
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
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
  ctx.fillStyle = current.task.type

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
