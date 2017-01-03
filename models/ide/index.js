const reducers = require('./reducers')
const effects = require('./effects')
const subscriptions = require('./subscriptions')

const initialState = {
  robot: { x: 0, y: 0 },
  gameSpeed: 500,
  code: '',
  workspace: ''
}

module.exports = {
  state: initialState,
  effects,
  reducers,
  subscriptions
}
