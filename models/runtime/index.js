const update = require('immutability-helper')
const Runtime = require('../../lib/runtime/runtime')
const api = require('./robot-api')

function create () {
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

      triggerEvent: (state, { name, args, groupId }) => {
        runtime.triggerEvent(name, args, groupId)
      }
    },

    subscriptions: {
      runtime: (send) => {
        runtime.connect(send)
      }
    }
  }

  return {
    model,
    setState: (state) => runtime.setState(state)
  }
}

module.exports = {
  create
}
