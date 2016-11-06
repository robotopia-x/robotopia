window.acorn = require('JS-Interpreter.git/acorn')
const { Interpreter } = require('JS-Interpreter.git/interpreter')
const { MOVE, ROTATE } = require('../utils/types')

function addApi ({ send, scope, interpreter }) {
  function move (value, callback) {
    setTimeout(() => {
      callback(interpreter.createPrimitive(undefined))
      send('move', { id: 'robot', params: [MOVE[value.data]] }, () => {})

      if (!interpreter.run()) {
        send('changeRunningState', { running: false }, () => {
        })
      }
    }, 500)
  }

  function rotate (value, callback) {
    setTimeout(() => {
      callback(interpreter.createPrimitive(undefined))
      send('rotate', { id: 'robot', params: [ROTATE[value.data]] }, () => {})

      if (!interpreter.run()) {
        send('changeRunningState', { running: false }, () => {})
      }
    }, 500)
  }

  interpreter.setProperty(scope, 'move', interpreter.createAsyncFunction(move))
  interpreter.setProperty(scope, 'rotate', interpreter.createAsyncFunction(rotate))
}

function run (sourcecode, send, done) {
  const interpreter = new Interpreter(sourcecode, (interpreter, scope) => (
    addApi({ send, interpreter, scope })
  ))

  if (interpreter.run()) {
    send('changeRunningState', { running: true }, () => {})
  }
}

module.exports = {
  run
}
