const html = require('choo/html')
const sf = require('sheetify')
const canvasView = require('./canvas')
const renderer = require('../game/renderer')

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
  }
`

const gameView = (state, prev, send) => {
  return html`
    <div class="${prefix}">
      ${canvasView((ctx, width, height) => render(ctx, width, height, state))}
    </div>
  `
}

function render (ctx, width, height, state) {
  ctx.clearRect(0, 0, width, height)
  renderer.render(ctx, state)
}

module.exports = gameView
