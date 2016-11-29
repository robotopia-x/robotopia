const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')

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
  let changed = { zoom: 1250, pan: { x: 0, y: 0 } }

  update(onupdate)

  return html`
    <div class=${prefix}>
      <canvas onload=${onload}></canvas>
    </div>
  `

  function onupdate (_render) {
    render = _render
    if (ctx) {
      render(ctx, canvas.width, canvas.height, changed)
    }
  }

  function onload (el) {
    canvas = el
    ctx = canvas.getContext('2d')

    addCanvasListeners(canvas, ctx, changed, render)
    addwindowListeners(canvas, ctx, changed, render, el)

    resize(el)
    render(ctx, canvas.width, canvas.height, changed)
  }
})

function addCanvasListeners (canvas, ctx, changed, render) {
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

      changed.pan.x += (x - dragStart.x)
      changed.pan.y += (y - dragStart.y)

      render(ctx, canvas.width, canvas.height, changed)

      dragStart.x = evt.clientX
      dragStart.y = evt.clientY
    }
  })

  canvas.addEventListener('mouseup', (evt) => {
    dragging = false
  })

  canvas.addEventListener('mousewheel', (evt) => {
    if (evt.deltaY > 0) {
      changed.zoom += evt.deltaY / 2
    } else {
      changed.zoom += evt.deltaY / 2
    }

    changed.zoom = clamp(1, 5000, changed.zoom)

    render(ctx, canvas.width, canvas.height, changed)
  }, false)
}

function addwindowListeners (canvas, ctx, changed, render, el) {
  window.addEventListener('resize', () => {
    resize(el)
    render(ctx, canvas.width, canvas.height, changed)
  })

  window.addEventListener('mousewheel', (evt) => {
    evt.preventDefault()
  }, false)
}

function resize (el) {
  const parWidth = el.parentNode.offsetWidth - 50
  const parHeight = el.parentNode.offsetHeight - 50

  const newDims = parHeight > parWidth ? parWidth : parHeight

  el.width = newDims
  el.height = newDims
}

function clamp (min, max, value) {
  if (value < min) {
    return min
  } else if (value > max) {
    return max
  } else {
    return value
  }
}

module.exports = canvasView

