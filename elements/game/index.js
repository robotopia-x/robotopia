const canvasWidget = require('../canvas')
const renderer = require('./renderer')

const canvasView = canvasWidget()

const gameView = ({ state, progress }) =>
  canvasView((ctx, width, height) => render(ctx, width, height, state, progress))

function render (ctx, width, height, state, progress) {
  ctx.clearRect(0, 0, width, height)
  renderer.render(ctx, state, progress)
}

module.exports = gameView
