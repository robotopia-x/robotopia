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
const app = choo()

app.model(require('./model'))

app.router((route) => [
  route('/', require('./components/main'))
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
