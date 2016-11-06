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

  update(onupdate)

  return html`
    <div class=${prefix}>
      <canvas onload=${onload}></canvas>
    </div>
  `

  function onupdate (_render) {
    render = _render
    if (ctx) {
      render(ctx, canvas.width, canvas.height)
    }
  }

  function onload (el) {
    canvas = el
    ctx = canvas.getContext('2d')

    resize(el)
    render(ctx, canvas.width, canvas.height)

    window.addEventListener('resize', () => {
      resize(el)
      render(ctx, canvas.width, canvas.height)
    })
  }
})

function resize (el) {
  const parWidth = el.parentNode.offsetWidth - 50
  const parHeight = el.parentNode.offsetHeight - 50

  const newDims = parHeight > parWidth ? parWidth : parHeight

  el.width = newDims
  el.height = newDims
}

module.exports = canvasView

