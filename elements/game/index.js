const html = require('choo/html')
const sf = require('sheetify')
const canvasView = require('../canvas')
const renderer = require('./renderer')

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
  }
`

const gameView = (state, progress) => {
  return html`
    <div class="${prefix}">
      ${canvasView((ctx, width, height) => render(ctx, width, height, state, progress))}
    </div>
  `
}

function render (ctx, width, height, state, progress) {
  ctx.clearRect(0, 0, width, height)
  renderer.render(ctx, state, progress)
}

module.exports = gameView
