const choo = require('choo')
const _ = require('lodash')
const mainView = require('./main')
const interpreter = require('./interpreter')

const app = choo()

app.model({
  state: {
    robot: { x: 5, y: 5 }
  },

  subscriptions: [
    (send, done) => {
      interpreter.subscribe(send, done)
      interpreter.run(`
        move('up');
        move('down');
        move('left');
        move('right');
      `)
    }
  ],

  reducers: {
    move: ({ direction }, state) => {
      console.log('move', direction)
      return state
    },

    changeRunningState: ({ running }, state) => {
      console.log('running', running)
      return state
    }
  }
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
