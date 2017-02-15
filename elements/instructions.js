const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    height: 100%;
    width: 100%;
  }
`

function instructionView () {
  return html`
    <div class="${prefix}">
      <h1>Hello World</h1>
    </div>
  `
}

module.exports = {
  instructionView
}
