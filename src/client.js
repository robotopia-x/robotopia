const choo = require('choo')
const _ = require('lodash')
const mainView = require('./main')

const app = choo()

app.model({
  state: {
    simulation: {
      running: false,
      time: 0
    }

  },
  reducers: {}
})

app.router((route) => [
  route('/', mainView)
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
