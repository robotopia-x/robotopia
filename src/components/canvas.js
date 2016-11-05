const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    
  }  
`
const canvasView = widget((update) => {
  let ctx, render, canvas

  update(onupdate)

  return html`
    <div>
      <canvas class=${prefix} onload=${onload}></canvas>
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

    render(ctx, canvas.width, canvas.height)
  }
})

module.exports = canvasView

