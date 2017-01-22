const _ = require('lodash')
const update = require('immutability-helper')
const Runtime = require('../../lib/runtime/runtime')
const api = require('./robot-api')

module.exports = () => {
  const runtime = new Runtime()

  const model = {
    namespace: 'runtime',

    state: {
      code: {}
    },

    reducers: {
      commitCode: (state, { code, groupId }) =>
        update(state, {
          code: {
            [groupId]: { $set: code }
          }
        })
    },

    effects: {
      createRobot: ({ code }, { id, groupId }) => {
        runtime.createAgent({
          id: id, 
          api: api, 
          code: code[groupId], 
          groupId: groupId })
      },

      destroyRobot: (state, { id }) => {
        runtime.destroyAgent(id)
      },

      triggerEvent: (state, { type, args, target }) => {
        runtime.triggerEvent(type, args, target)
      },

      switchMode: (state, { type, args, target }) => {
        runtime.switchMode(type, args, target)
      },

      step: () => {
        runtime.step()
      },

      reset: () => {
        runtime.reset()
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
