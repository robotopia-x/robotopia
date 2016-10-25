const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
    :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    :host > .divider {
       background: grey;
       width: 10px;
       height: 100%;
    }

    :host > .column {
      flex-grow: 1;
    }
`

const mainView = (state, prev, send) => html`
  <main class=${prefix}>
    <div class="column"></div>
    <div class="divider"></div>
    <div class="column"></div>
  </main>
`

module.exports = mainView
