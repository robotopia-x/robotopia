const _ = require('lodash')
const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')

const MIN_INITAL_VIEWPORT_SIZE = 200 // inital zoom is set so viewport will have at least this height and width
const MIN_SCALE = 0.1
const MAX_SCALE = 1
const INITIAL_TRANSFORM = {
  scale: 1,
  translate: {
    x: 0, y: 0
  }
}

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
  }

  :host > canvas {
    cursor: -webkit-grab;
    cursor: grab;
  }

  :host > canvas.dragging {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
`

function canvasWidget () {
  let ctx = null
  let canvas = null
  let isDragging = false
  let render = _.noop
  let transform = INITIAL_TRANSFORM
  let prevDragPoint

  return widget({
    onupdate: (el, params) => {
      render = params.render

      if (ctx !== null) {
        renderCanvas()
      }
    },

    onload: (el) => {
      canvas = el.querySelector('canvas')
      ctx = canvas.getContext('2d')

      canvas.addEventListener('mousedown', handleDragStart)
      canvas.addEventListener('mousemove', handleDragMove)
      canvas.addEventListener('mouseup', handleDragEnd)
      canvas.addEventListener('mouseleave', handleDragEnd)
      canvas.addEventListener('mousewheel', handleZoom)
      window.addEventListener('resize', resize)

      transform.scale = Math.min(Math.min(1, canvas.width / MIN_INITAL_VIEWPORT_SIZE), canvas.height / MIN_INITAL_VIEWPORT_SIZE)

      resize()

      renderCanvas()
    },

    onunload: () => {
      ctx = null
      isDragging = false
      transform = INITIAL_TRANSFORM
      canvas.removeEventListener('mousedown', handleDragStart)
      canvas.removeEventListener('mousemove', handleDragMove)
      canvas.removeEventListener('mouseup', handleDragEnd)
      canvas.removeEventListener('mouseleave', handleDragEnd)
      canvas.removeEventListener('mousewheel', handleZoom)
      canvas = null

      window.removeEventListener('resize', resize)
    },

    render: (params) => {
      render = params.render

      return html`
        <div class="${prefix}">
          <canvas></canvas>  
        </div>
      `
    }
  })

  function handleDragStart (evt) {
    isDragging = true
    prevDragPoint = { x: evt.clientX, y: evt.clientY }
    canvas.classList.add('dragging')
  }

  function handleDragMove (evt) {
    if (isDragging) {
      let x = evt.clientX
      let y = evt.clientY

      transform.translate.x += (x - prevDragPoint.x) / transform.scale
      transform.translate.y += (y - prevDragPoint.y) / transform.scale

      prevDragPoint.x = evt.clientX
      prevDragPoint.y = evt.clientY

      renderCanvas()
    }
  }

  function handleDragEnd (evt) {
    isDragging = false
    canvas.classList.remove('dragging')
  }

  function resize () {
    canvas.width = canvas.parentNode.offsetWidth
    canvas.height = canvas.parentNode.offsetHeight

    renderCanvas()
  }

  function handleZoom (evt) {
    evt.preventDefault()
    const scale = transform.scale - (evt.deltaY / 2000)
    transform.scale = _.clamp(scale, MIN_SCALE, MAX_SCALE)

    renderCanvas()
  }

  function renderCanvas () {
    const viewport = _.assign({}, { width: canvas.width, height: canvas.height }, transform)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()

    render(ctx, viewport)

    ctx.restore()
  }
}

module.exports = canvasWidget
