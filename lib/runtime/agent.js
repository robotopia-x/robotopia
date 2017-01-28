const _ = require('lodash')
const esper = require('esper.js')

// an agent represents a entity inside an simulation which can be scripted at runtime with javascript
class Agent {

  constructor ({
    id, groupId, api, code,
    getState, onAction, onCompleteMode
  }) {
    this.id = id
    this.groupId = groupId

    // assign methods
    this.getState = getState
    this.onActionCallback = onAction
    this.onCompleteModeCallback = onCompleteMode

    this.initAgent(code, api)
  }

  initAgent (code, api) {
    this.terminatedMain = false

    this.mainModeEngine = this.modeEngine = this.currentEngine = new esper.Engine()
    this.availableActions = this.actionsPerRound = api.actionsPerRound

    this.addAPI(api)

    this.mainModeEngine.load(code)
  }

  addAPI ({ namespace, methods, globals, actions, sensors }) {
    this.namespace = namespace

    _.forEach(globals, (global, name) => {
      this.mainModeEngine.addGlobal(name, global)
    })

    this.mainModeEngine.addGlobal(namespace, this.getAPIObject({ actions, sensors }))

    this.registerMethods({ namespace, methods })
  }

  // turns action definitions in functions which can be called by the Robot code
  getAPIObject ({ actions, sensors }) {
    return _.merge(
      {},
      this.getAPIActions(actions),
      this.getAPISensors(sensors)
    )
  }

  getAPIActions (actions) {
    return _.reduce(actions, (api, method, name) => {
      api[name] = (...params) => {
        const { action, cost } = method.apply(null, params)
        const [name, data] = action

        this.onActionCallback(this.id, name, data)

        this.availableActions -= cost
      }
      return api
    }, {})
  }

  getAPISensors (sensors) {
    return _.reduce(sensors, (api, method, name) => {
      api[name] = (...params) => {
        const state = this.getState()
        return method.apply(null, [state, this.id].concat(params))
      }

      return api
    }, {})
  }

  registerMethods ({ namespace, methods }) {
    const script = _.reduce(methods, (script, method, name) => {
      return script + `${namespace}.${name}=${method.toString()}\n`
    }, '')

    this.mainModeEngine.load(script)
    this.mainModeEngine.runSync()
  }

  // trigger event will interrupt the current executed mode handler and switch to the event handler
  // afterwards the execution of the handler will be continued at the position where it was interupted
  // if the agent already handles an event the new event will be ignored
  triggerEvent (name, args) {
    if (this.handlesEvent()) {
      return
    }

    const engine = this.createHandlerEngine({ type: 'event', name, args })

    // ignore if there is no handler defined in the code of the agent
    if (engine === null) {
      return
    }

    this.currentEngine = engine
  }

  // switch engine to execute other mode handler. Modes are intended to switch between different behaviours during the simulation
  // The execution of a mode handler can be interrupted by events. Once a mode handler is terminated the agent continues executing
  switchMode (name, args) {
    const engine = this.createHandlerEngine({ type: 'mode', name, args })

    // ignore if there is no handler defined in the code of the agent
    if (engine === null) {
      return
    }

    this.currentEngine = this.modeEngine = engine
  }

  createHandlerEngine ({ type, name, args }) {
    if (!this.hasHandler({ type, name })) {
      return null
    }

    // create separate engine which shares all the state with the main engine
    // the code of the engine just calls the event handler
    const engine = this.mainModeEngine.fork()

    const source = `${this.namespace}.__${type}Handlers['${name}'].apply(${this.namespace}, ${JSON.stringify(args)})`

    // load code which calls the event handler
    engine.load(source)

    return engine
  }

  hasHandler ({ type, name }) {
    const namespaceScope = this.currentEngine.globalScope.get(this.namespace)
    // this doesn't contain a regular object because we are dealing with esper.js interals here, you can just use this to test if handlers exist
    const handlerObject = namespaceScope.get(`__${type}Handlers`).next().value.properties

    return handlerObject !== undefined && handlerObject[name] !== undefined
  }

  step () {
    if (this.isInMainMode() && this.terminatedMain) {
      return
    }

    this.availableActions = this.actionsPerRound
    let terminated = false

    // step until all available actions have been spent
    do {
      terminated = this.currentEngine.step()
    } while (!terminated && this.availableActions > 0)

    // only need to switch engine if current engine terminated
    if (terminated) {
      if (this.handlesEvent()) { // switch back to previous mode if event handler terminated
        this.currentEngine = this.modeEngine

        // continue execution if event handler hasn't spend all available actions
        if (this.availableActions > 0) {
          this.step()
        }

        return
      }

      if (!this.isInMainMode()) { // switch back to main if terminated other mode
        this.onCompleteModeCallback(this.id)
        this.currentEngine = this.mainModeEngine
        this.modeEngine = this.mainModeEngine
        return
      }

      // otherwise main mode has terminated
      this.terminatedMain = true
    }
  }

  handlesEvent () {
    return this.currentEngine !== this.modeEngine
  }

  isInMainMode () {
    return this.currentEngine === this.mainModeEngine
  }
}

module.exports = Agent
