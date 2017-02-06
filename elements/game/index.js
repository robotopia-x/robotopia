const canvasWidget = require('../canvas')
const renderer = require('./renderer')

const canvasView = canvasWidget()

module.exports = ({ state, progress }) =>
  canvasView({
    render: (ctx, viewport) =>
      renderer.render(ctx, viewport, state, progress)
  })

