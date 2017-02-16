const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    height: 100%;
    width: 100%;
    padding: 25px;
    margin: 0;
  }
  
  :host > .instruction {
  }
`

function instructionView () {
  return html`
    <div class="${prefix}">
      <div class="instruction">
        <h1>Hello World</h1>
      </div>
    </div>
  `
}

module.exports = {
  instructionView
}
