const interpreter = require('./utils/interpreter')

const runCode = (data, state, send, done) => {
  interpreter.run(state.srcCode, send, done)
}

module.exports = {
  runCode
}
