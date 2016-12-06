const _ = require('lodash')
const reducers = require('./reducers')
const effects = require('./effects')
const clock = require('./utils/clock')

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
  subscriptions: [
    (send, done) => {
      clock.onTick(() => {
        send('stepRobotRuntime', _.noop)
      })
    }
  ]
}
