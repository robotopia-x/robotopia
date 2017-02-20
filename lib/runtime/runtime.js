const _ = require('lodash')
const Agent = require('./agent')

class Runtime {

  constructor () {
    this.agents = {}
    this._onActionCallback = _.noop
    this._onCompleteModeCallback = _.noop
  }

  onAction (callback) {
    this._onActionCallback = callback
  }

  onCompleteMode (callback) {
    this._onCompleteModeCallback = callback
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
      onAction: this._onActionCallback,
      onCompleteMode: this._onCompleteModeCallback,
      getState: () => this.state
    })
  }

  destroyAgent (id) {
    delete this.agents[id]
  }

  // triggers agent event
  //
  // target can have 2 properties (most specific will apply)
  //  id: id of the agent
  //  groupId: groupId of the agents
  //
  triggerEvent (name, args, target) {
    const agents = this.getTargetedAgents(target)
    _.forEach(agents, (agent) => agent.triggerEvent(name, args))
  }

  // switches mode handler of agent, works similar to trigger event
  switchMode (name, args, target) {
    const agents = this.getTargetedAgents(target)
    _.forEach(agents, (agent) => agent.switchMode(name, args))
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

  // deletes all existing agents
  reset () {
    this.agents = {}
  }
}

module.exports = Runtime
