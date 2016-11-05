const html = require('choo/html')
const sf = require('sheetify')
const canvasView = require('./canvas')

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

/*
canvas(state, render)
render(ctx, state)
*/

const gameView = (state, prev, send) => html`
    <div class="${prefix}">
      ${canvasView}
    </div>
  `

module.exports = gameView
