// TODO: replace this later with require
if (!window.__loaded) {
  document.write('<script src="./node_modules/blockly/blockly_compressed.js"></script>')
  document.write('<script src="./node_modules/blockly/blocks_compressed.js"></script>')
  document.write('<script src="./node_modules/blockly/msg/js/en.js"></script>')
  document.write('<script src="./node_modules/blockly/javascript_compressed.js"></script>')
  document.write('<script src="../lib/blocks.js"></script>')
  document.write('<script src="../lib/javascript-commands.js" onload="startApp()"}></script>')
}

window.__loaded = true

const _ = require('lodash')
const choo = require('choo')
const update = require('immutability-helper')
const mainView = require('./main')
const interpreter = require('./interpreter')

const app = choo()

app.model({
  state: {
    robot: { x: 5, y: 5 },
    running: false,
    srcCode: ''
  },

  effects: {
    runCode: (data, state, send, done) => {
      interpreter.run(state.srcCode, send, done)
      console.log(state.srcCode)
    }
  },

  reducers: {
    move: ({ direction }, state) => {
      let { robot: { x, y } } = state

      switch (direction) {
        case 'UP':
          y = y - 1
          break
        case 'DOWN':
          y = y + 1
          break
        case 'LEFT':
          x = x - 1
          break
        case 'RIGHT':
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

    changeRunningState: ({ running }, state) => update(state, { running: { $set: running } }),
    updateCode: ({ srcCode }, state) => update(state, { srcCode: { $set: srcCode } })
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

window.startApp = () => {
  document.body.innerHTML = ''
  document.body.appendChild(app.start())
}
