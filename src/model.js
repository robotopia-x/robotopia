const reducers = require('./reducers')
const effects = require('./effects')

const initialState = {
  robot: { x: 5, y: 5 },
  running: false,
  srcCode: ''
}

module.exports = {
  state: initialState,
  effects,
  reducers
}
