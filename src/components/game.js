const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const canvasView = require('./canvas')

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
  }
`

const gameView = (state, prev, send) => html`
    <div class="${prefix}">
      ${canvasView(_.partial(render, state))}
    </div>
  `

function render (state, ctx, cWidth, cHeight) {
  const {robot: { x, y }} = state

  ctx.clearRect(0, 0, cWidth, cHeight)
  ctx.fillRect(x, y, 10, 10)
}

module.exports = gameView
