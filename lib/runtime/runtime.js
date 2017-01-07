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

  createAgent ({ id, groupId, api, code }) {
    if (!_.isNil(this.agents[id])) {
      throw new Error(`Agent with the id '${id}' exists already`)
    }

    console.log(code)

    this.agents[id] = new Agent({
      id,
      groupId,
      api,
      code,
      send: this.send,
      getState: () => this.state
    })
  }

  destroyAgent (id) {
    delete this.agents[id]
  }

  // trigger event will interrupt the execution of the main program of an agent and execute it's event handler
  // if no groupId is specified it will be triggered on all agents
  triggerEvent (name, args, groupId) {
    let agents

    if (groupId === undefined) {
      agents = this.agents
    } else {
      agents = _.filter(this.agents, (agent) => agent.groupId === groupId)
    }

    _.forEach(agents, (agent) => agent.triggerEvent(name, args))
  }

  step () {
    _.forEach(this.agents, (agent, id) => agent.step())
  }
}

module.exports = Runtime
