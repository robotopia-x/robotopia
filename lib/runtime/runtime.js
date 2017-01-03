const _ = require('lodash')
const Agent = require('./agent')

class Runtime {

  constructor () {
    this.agents = {}
  }

  connect (send) {
    this.send = send
  }

  setState (state) {
    this.state = state
  }

  createAgent ({ id, api, code }) {
    if (!_.isNil(this.agents[id])) {
      throw new Error(`Agent with the id '${id}' exists already`)
    }

    this.agents[id] = new Agent({
      id,
      api,
      code,
      send: this.send,
      getState: () => this.state
    })
  }

  destroyAgent (id) {
    delete this.agents[id]
  }

  triggerEvent (name, args) {
    _.forEach(this.agents, (agent) => agent.triggerEvent(name, args))
  }

  step () {
    _.forEach(this.agents, (agent, id) => agent.step())
  }
}

module.exports = Runtime
