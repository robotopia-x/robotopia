const _ = require('lodash')
const choo = require('choo')
const update = require('immutability-helper')
const mainView = require('./main')
const interpreter = require('./interpreter')

const app = choo()

app.model({
  state: {
    robot: { x: 5, y: 5 },
    running: false
  },

  effects: {
    run: (data, state, send, done) => {
      interpreter.run(`
        move('up');
        move('down');
        move('left');
        move('right');
      `, done)
    }
  },

  subscriptions: [
    (send, done) => {
      interpreter.subscribe(send, done)
    }
  ],

  reducers: {
    move: ({ direction }, state) => {
      let { robot: { x, y } } = state

      switch (direction) {
        case 'up':
          y = y - 1
          break
        case 'down':
          y = y + 1
          break
        case 'left':
          x = x - 1
          break
        case 'right':
          x = x + 1
          break
      }

      return update(state, {
        robot: {
          x: { $set: _.clamp(x, 0, 9) },
          y: { $set: _.clamp(y, 0, 9) }
        }
      })
    },

    changeRunningState: ({ running }, state) => update(state, { running: { $set: running } })
  }
})

app.router((route) => [
  route('/', mainView)
])

// setup hot module replacement
app.use({
  onStateChange: function (data, state, prev, caller, createSend) {
    window.__state = state
  },
  wrapInitialState: (obj) => (_.assign({}, obj, window.__state))
})

if (module.hot) {
  module.hot.accept()
}

document.body.innerHTML = ''
document.body.appendChild(app.start())
