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
  // target specifies on which agents the event will be triggered
  //
  // target can have 2 properties (most specific will apply)
  //  id: id of the agent
  //  groupId: groupId of the agents
  //
  triggerEvent (name, args, target) {
    const agents = this.getTargetedAgents(target)
    _.forEach(agents, (agent) => agent.triggerEvent(name, args))
  }

  getTargetedAgents (target) {
    if (target.id !== undefined) {
      return [this.agents[target.id]]
    }

    if (target.groupId !== undefined) {
      return _.filter(this.agents, (agent) => {
        return agent.groupId === target.groupId
      })
    }

    return this.agents
  }

  step () {
    _.forEach(this.agents, (agent, id) => agent.step())
  }
}

module.exports = Runtime
