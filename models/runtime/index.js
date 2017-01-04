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
      createRobot: ({ code }, { id }) => {
        runtime.createAgent({ id, api, code })
      },

      destroyRobot: (state, { id }) => {
        runtime.destroyAgent(id)
      },

      step: () => {
        runtime.step()
      },

      triggerEvent: (state, { name, args }) => {
        runtime.triggerEvent(name, args)
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
