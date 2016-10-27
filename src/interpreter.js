window.acorn = require('JS-Interpreter.git/acorn')
const { Interpreter } = require('JS-Interpreter.git/interpreter')

function getApi ({ send, scope, interpreter }) {
  function move (value, callback) {
    setTimeout(() => {
      callback(interpreter.createPrimitive(undefined))
      send('move', { direction: value.data }, () => {
      })

      if (!interpreter.run()) {
        send('changeRunningState', { running: false }, () => {
        })
      }
    }, 500)
  }

  interpreter.setProperty(scope, 'move', interpreter.createAsyncFunction(move))
}

function run (sourcecode, send, done) {
  const interpreter = new Interpreter(sourcecode, (interpreter, scope) => (
    getApi({ send, interpreter, scope })
  ))

  if (interpreter.run()) {
    send('changeRunningState', { running: true }, () => {})
  }
}

module.exports = {
  run
}
