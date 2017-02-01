const _ = require('lodash')
const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')

// inital zoom is set so viewport will have at least this height and width
const MIN_INITAL_VIEWPORT_SIZE = 1000

const INITIAL_TRANSFORM = { zoom: 1, pan: { x: 0, y: 0 } }

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
  let canvasTransform = INITIAL_TRANSFORM
  let prevDragPoint

  return widget({
    onupdate: (el, _render) => {
      render = _render

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

      resize()

      renderCanvas()
    },

    onunload: () => {
      ctx = null
      isDragging = false
      canvasTransform = INITIAL_TRANSFORM

      canvas.removeEventListener('mousedown', handleDragStart)
      canvas.removeEventListener('mousemove', handleDragMove)
      canvas.removeEventListener('mouseup', handleDragEnd)
      canvas.removeEventListener('mouseleave', handleDragEnd)
      canvas.removeEventListener('mousewheel', handleZoom)
      canvas = null

      window.removeEventListener('resize', resize)
    },

    render: (_render) => {
      render = _render

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

      canvasTransform.pan.x += (x - prevDragPoint.x) / canvasTransform.zoom
      canvasTransform.pan.y += (y - prevDragPoint.y) / canvasTransform.zoom

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

    // zoom out if width or height of canvas are less than 1000
    canvasTransform.zoom = Math.min(Math.min(1, canvas.width / MIN_INITAL_VIEWPORT_SIZE), canvas.height / MIN_INITAL_VIEWPORT_SIZE)

    renderCanvas()
  }

  function handleZoom (evt) {
    evt.preventDefault()
    const zoom = canvasTransform.zoom - (evt.deltaY / MIN_INITAL_VIEWPORT_SIZE)
    canvasTransform.zoom = _.clamp(zoom, 0.1, 2)

    renderCanvas()
  }

  function renderCanvas () {
    const { pan, zoom } = canvasTransform

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()

    // apply canvas transform
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.scale(zoom, zoom)
    ctx.translate(pan.x, pan.y)

    render(ctx, canvas.width, canvas.height)

    ctx.restore()
  }
}

module.exports = canvasWidget
