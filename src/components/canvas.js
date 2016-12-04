const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')

// inital zoom is set so viewport will have at least this height and width
const MIN_INITAL_VIEWPORT_SIZE = 1000

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
  }

  :host > canvas {
    cursor: -webkit-grab;
    cursor: grab;
  }

  :host > canvas.dragging{
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
`

const canvasView = widget((update) => {
  let ctx, render, canvas
  let canvasTransform = { zoom: 1, pan: { x: 0, y: 0 } }

  update(onupdate)

  return html`
    <div class=${prefix}>
      <canvas onload=${onload}></canvas>
    </div>
  `

  function onupdate (_render) {
    render = _render

    if (ctx) {
      callRender(canvas, ctx, canvasTransform, render)
    }
  }

  function onload (el) {
    canvas = el
    ctx = canvas.getContext('2d')

    addCanvasListeners(canvas, ctx, canvasTransform, render)
    addWindowListeners(canvas, ctx, canvasTransform, render)

    resize(canvas, canvasTransform)
    callRender(canvas, ctx, canvasTransform, render)
  }

  function callRender (canvas, ctx, canvasTransform, render) {
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

  function addCanvasListeners () {
    let dragStart = { x: 0, y: 0 }
    let dragging = false

    canvas.addEventListener('mousedown', (evt) => {
      dragging = true
      dragStart.x = evt.clientX
      dragStart.y = evt.clientY
      canvas.classList.add('dragging')
    })

    canvas.addEventListener('mousemove', (evt) => {
      if (dragging) {
        let x = evt.clientX
        let y = evt.clientY

        canvasTransform.pan.x += (x - dragStart.x) / canvasTransform.zoom
        canvasTransform.pan.y += (y - dragStart.y) / canvasTransform.zoom

        callRender(canvas, ctx, canvasTransform, render)

        dragStart.x = evt.clientX
        dragStart.y = evt.clientY
      }
    })

    canvas.addEventListener('mouseup', () => {
      dragging = false
      canvas.classList.remove('dragging')
    })

    canvas.addEventListener('mouseleave', () => {
      dragging = false
      canvas.classList.remove('dragging')
    })

    canvas.addEventListener('mousewheel', (evt) => {
      const zoom = canvasTransform.zoom + (evt.deltaY / MIN_INITAL_VIEWPORT_SIZE)

      canvasTransform.zoom = _.clamp(zoom, 0.1, 2)
    }, false)
  }

  function addWindowListeners () {
    window.addEventListener('resize', () => {
      resize(canvas, canvasTransform)

      callRender(canvas, ctx, canvasTransform, render)
    })

    window.addEventListener('mousewheel', (evt) => {
      evt.preventDefault()
      callRender(canvas, ctx, canvasTransform, render)
    }, false)
  }

  function resize (canvas, canvasTransform) {
    canvas.width = canvas.parentNode.offsetWidth
    canvas.height = canvas.parentNode.offsetHeight

    // zoom out if width or height of canvas are less than 1200
    canvasTransform.zoom = Math.min(Math.min(1, canvas.width / MIN_INITAL_VIEWPORT_SIZE), canvas.height / MIN_INITAL_VIEWPORT_SIZE)
  }
})

module.exports = canvasView
