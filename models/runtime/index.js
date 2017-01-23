const _ = require('lodash')
const update = require('immutability-helper')
const Runtime = require('../../lib/runtime/runtime')
const api = require('./robot-api')

module.exports = () => {
  const runtime = new Runtime()

  const model = {
    namespace: 'runtime',

    state: {
      code: ''
    },

    reducers: {
      commitCode: (state, { code }) => {
        return update(state, {
          code: { $set: code }
        })
      }
    },

    effects: {
      createRobot: ({ code }, { id, groupId }) => {
        runtime.createAgent({ id, api, code, groupId })
      },

      destroyRobot: (state, { id }) => {
        runtime.destroyAgent(id)
      },

      step: () => {
        runtime.step()
      },

      triggerEvent: (state, { name, args, target }) => {
        runtime.triggerEvent(name, args, target)
      },

      switchMode: (state, { name, args, target }) => {
        runtime.switchMode(name, args, target)
      }
    },

    subscriptions: {
      runtime: (send) => {
        runtime.onAction((id, name, data) => send(name, { target: id, data }, _.noop))
        runtime.onCompleteMode((id) => send('game:worker.completeTask', { target: id, data: {} }, _.noop))
      }
    }
  }

  return {
    model,
    setState: (state) => runtime.setState(state)
  }
}
