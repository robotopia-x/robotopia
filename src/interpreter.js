window.acorn = require('JS-Interpreter.git/acorn')
const { Interpreter } = require('JS-Interpreter.git/interpreter')

function getApi ({ send, scope, interpreter }) {
  function move (value, callback) {
    setTimeout(() => {
      callback(interpreter.createPrimitive(undefined))
      send('move', { direction: value.data }, () => {})

      if (!interpreter.run()) {
        send('changeRunningState', { running: false }, () => {})
      }
    }, 100)
  }

  interpreter.setProperty(scope, 'move', interpreter.createAsyncFunction(move))
}

module.exports = {
  subscribe (send, done) {
    this.send = send
    this.done = done
  },

  run (sourcecode) {
    const interpreter = new Interpreter(sourcecode, (interpreter, scope) => (
      getApi({
        send: this.send,
        interpreter,
        scope
      })
    ))

    this.done()

    if (interpreter.run()) {
      this.send('changeRunningState', { running: true }, () => {})
    }
  }
}
