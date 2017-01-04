const reducers = require('./reducers')
const effects = require('./effects')
const initialToolbox = require('../../lib/blockly/toolbox')

const initialState = {
  robot: { x: 0, y: 0 },
  gameSpeed: 0.5,
  code: '',
  workspace: '',
  toolbox: ''
}

module.exports = {
  state: initialState,
  effects,
  reducers
}
