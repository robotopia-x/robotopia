window.acorn = require('JS-Interpreter.git/acorn')
const _ = require('lodash')
const { Interpreter } = require('JS-Interpreter.git/interpreter')
const { MOVE, ROTATE } = require('../utils/types')

function addApi ({ send, scope, interpreter }) {
  function move (value, callback) {
    setTimeout(() => {
      callback(interpreter.createPrimitive(undefined))
      send('game:robot.move', { target: 'robot', data: { direction: MOVE[value.data] } }, _.noop)

      if (!interpreter.run()) {
        send('changeRunningState', { running: false }, () => {
        })
      }
    }, 500)
  }

  function rotate (value, callback) {
    setTimeout(() => {
      callback(interpreter.createPrimitive(undefined))
      send('game:robot.rotate', { target: 'robot', data: { direction: ROTATE[value.data] } }, _.noop)

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
