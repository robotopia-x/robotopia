const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
    :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    
    :host > .column:first-child {
       width: 50%;
       border-right: 10px solid grey;       
    }
`

const appView = (state, prev, send) => html`
  <main class=${prefix}>
    <div class="column"></div>
    <div class="column"></div>
  </main>
`

module.exports = appView
