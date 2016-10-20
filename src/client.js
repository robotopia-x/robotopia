const choo = require('choo')
const _ = require('lodash')
const appView = require('./app')

const app = choo()

app.model({
  state: {},
  reducers: {}
})

app.router((route) => [
  route('/', appView)
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
