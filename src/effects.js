const interpreter = require('./utils/interpreter')

const runCode = (data, state, send, done) => {
  interpreter.run(state.srcCode, send, done)
  console.log(state.srcCode)
}

module.exports = {
  runCode
}
