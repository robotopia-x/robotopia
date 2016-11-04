const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')

document.write(`
  <script src="../node_modules/blockly/blockly_compressed.js"></script>
  <script src="../node_modules/blockly/blocks_compressed.js"></script>
  <script src="../node_modules/blockly/javascript_compressed.js"></script>
`)

const app = choo()

app.model({
  state: { title: 'Not quite set yet' },
  reducers: {
    update: (data, state) => ({ title: data })
  }
})

app.router((route) => [
  route('/', require('./views/blockly'))
])

// setup hot module replacement
app.use({
  onStateChange: function (data, state, prev, caller, createSend) { window.__state = state },
  wrapInitialState: (obj) => (_.assign({}, obj, window.__state))
})

if (module.hot) {
  module.hot.accept()
}

document.body.innerHTML = ''
document.body.appendChild(app.start())
