const Runtime = require('../../lib/runtime/runtime')

const api = require('./robot-api')

function create () {
  const runtime = new Runtime()

  const model = {
    namespace: 'runtime',

    effects: {
      createRobot: (state, { id, code }) => {
        runtime.createAgent({ id, api, code })
      },

      destroyRobot: (state, { id }) => {
        runtime.destroyAgent(id)
      },

      step: () => {
        runtime.step()
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
