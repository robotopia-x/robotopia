const html = require('choo/html')
const sf = require('sheetify')
const canvasView = require('./canvas')
const renderer = require('../game/renderer')
const clock = require('../utils/clock')

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
  }
`

const gameView = (state, prev) => {
  return html`
    <div class="${prefix}">
      ${canvasView((ctx, width, height) => render(ctx, width, height, state, prev))}
    </div>
  `
}

function render (ctx, width, height, state, prev) {
  ctx.clearRect(0, 0, width, height)
  renderer.render(ctx, state, prev, clock.getProgress())
}

module.exports = gameView
