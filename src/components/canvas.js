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
})

function callRender (canvas, ctx, canvasTransform, render) {
  const { pan, zoom } = canvasTransform;

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.scale(zoom, zoom)

  ctx.translate( pan.x,  pan.y)



  //ctx.translate(pan.x / zoom, pan.y / zoom)


  render(ctx, canvas.width, canvas.height)

  ctx.restore()
}

function addCanvasListeners (canvas, ctx, canvasTransform, render) {
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

      canvasTransform.pan.x += (x - dragStart.x) / canvasTransform.zoom
      canvasTransform.pan.y += (y - dragStart.y) / canvasTransform.zoom

      callRender(canvas, ctx, canvasTransform, render)

      dragStart.x = evt.clientX
      dragStart.y = evt.clientY
    }
  })

  canvas.addEventListener('mouseup', (evt) => {
    dragging = false
  })

  canvas.addEventListener('mouseleave', (evt) => {
    dragging = false
  })

  canvas.addEventListener('mousewheel', (evt) => {
    const zoom = canvasTransform.zoom + (evt.deltaY / 2000)

    canvasTransform.zoom = _.clamp(zoom, 0.1, 2)
  }, false)
}

function addWindowListeners (canvas, ctx, canvasTransform, render) {
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
  canvasTransform.zoom = Math.min(1, canvas.width / 1000)
}

module.exports = canvasView
