const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
  }
`

const canvasView = widget((update) => {
  let ctx, render, canvas
  let canvasTransforms = { zoom: 1250, pan: { x: 0, y: 0 } }

  update(onupdate)

  return html`
    <div class=${prefix}>
      <canvas onload=${onload}></canvas>
    </div>
  `

  function onupdate (_render) {
    render = _render
    if (ctx) {
      callRender(canvas, ctx, canvasTransforms, render)
    }
  }

  function onload (el) {
    canvas = el
    ctx = canvas.getContext('2d')

    addCanvasListeners(canvas, ctx, canvasTransforms, render)
    addWindowListeners(canvas, ctx, canvasTransforms, render, el)

    resize(el)
    callRender(canvas, ctx, canvasTransforms, render)
  }
})

function callRender (canvas, ctx, canvasTransforms, render) {
  const newGameWidth = canvas.width / canvasTransforms.zoom
  const newGameHeight = canvas.height / canvasTransforms.zoom
  const newXPos = canvasTransforms.pan.x + (canvasTransforms.zoom / 2 - canvas.width / 2)
  const newYPos = canvasTransforms.pan.y + (canvasTransforms.zoom / 2 - canvas.height / 2)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.scale(newGameWidth, newGameHeight)
  ctx.translate(newXPos, newYPos)
  render(ctx, canvas.width, canvas.height)
  ctx.restore()
}

function addCanvasListeners (canvas, ctx, canvasTransforms, render) {
  let dragStart = { x: 0, y: 0 }
  let dragging = false

  canvas.addEventListener('mousedown', (evt) => {
    dragging = true
    dragStart.x = evt.clientX
    dragStart.y = evt.clientY
  })

  canvas.addEventListener('mousemove', (evt) => {
    if (dragging) {
      let x = evt.clientX
      let y = evt.clientY

      canvasTransforms.pan.x += (x - dragStart.x)
      canvasTransforms.pan.y += (y - dragStart.y)

      callRender(canvas, ctx, canvasTransforms, render)

      dragStart.x = evt.clientX
      dragStart.y = evt.clientY
    }
  })

  canvas.addEventListener('mouseup', (evt) => {
    dragging = false
  })

  canvas.addEventListener('mousewheel', (evt) => {
    if (evt.deltaY > 0) {
      canvasTransforms.zoom += evt.deltaY / 2
    } else {
      canvasTransforms.zoom += evt.deltaY / 2
    }

    canvasTransforms.zoom = _.clamp(canvasTransforms.zoom, 1, 5000)
  }, false)
}

function addWindowListeners (canvas, ctx, canvasTransforms, render, el) {
  window.addEventListener('resize', () => {
    resize(el)
    callRender(canvas, ctx, canvasTransforms, render)
  })

  window.addEventListener('mousewheel', (evt) => {
    evt.preventDefault()
    callRender(canvas, ctx, canvasTransforms, render)
  }, false)
}

function resize (el) {
  const parWidth = el.parentNode.offsetWidth - 50
  const parHeight = el.parentNode.offsetHeight - 50

  const newDims = parHeight > parWidth ? parWidth : parHeight

  el.width = newDims
  el.height = newDims
}

module.exports = canvasView
