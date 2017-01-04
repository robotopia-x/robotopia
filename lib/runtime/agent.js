const _ = require('lodash')
const esper = require('esper.js')

class Agent {

  constructor ({ id, groupId, api, code, send, getState }) {
    this.id = id
    this.groupId = groupId
    this.send = send
    this.api = api
    this.getState = getState

    this.loadCode(code)
  }

  loadCode (code) {
    this.completedTurn = true
    this.terminatedMain = false
    this.currentEngine = this.mainEngine = new esper.Engine()

    this.addAPI(this.api)
    this.registerMethods(this.api)

    this.mainEngine.load(code)
  }

  registerMethods ({ namespace, functions }) {
    const script = _.reduce(functions, (script, method, name) => {
      return script + `${namespace}.${name}=${method.toString()}\n`
    }, '')

    this.mainEngine.load(script)
    this.mainEngine.runSync()
  }

  addAPI ({ namespace, globals, actions, sensors }) {
    this.namespace = namespace

    _.forEach(globals, (global, name) => {
      this.mainEngine.addGlobal(name, global)
    })

    this.mainEngine.addGlobal(namespace, this.getAPIObject({ actions, sensors }))
  }

  // turns action definitions in functions which can be called by the Robot code
  getAPIObject ({ actions, sensors }) {
    return _.merge({}, this.getAPIActions(actions), this.getAPISensors(sensors))
  }

  getAPIActions (actions) {
    return _.reduce(actions, (api, method, name) => {
      api[name] = (...params) => {
        const [action, data] = method.apply(null, params)

        this.send(action, { target: this.id, data }, _.noop)

        this.completedTurn = true
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

  triggerEvent (name, args) {
    if (this.handlesEvent()) {
      return
    }

    const eventHandlerName = `on${_.capitalizeFirstLetter(name)}`

    // skip if agent program has no event handler
    if (!_.isFunction(this.currentEngine.globalScope.get(this.namespace).native[eventHandlerName])) {
      return
    }

    // create separate engine which shares all the state with the main engine
    // the code of the engine just calls the event handler
    this.currentEngine = this.currentEngine.fork()

    // load code which calls the event handler
    this.currentEngine.load(`${this.namespace}.${eventHandlerName}.apply(null, ${JSON.stringify(args)})`)
  }

  step () {
    if (this.terminatedMain && !this.handlesEvent()) {
      return
    }

    this.completedTurn = false
    let completed = false

    do {
      completed = this.currentEngine.step()
    } while (!completed && !this.completedTurn)

    if (completed) {
      if (this.handlesEvent()) {
        this.currentEngine = this.mainEngine

        // continue execution if event handler hasn't triggered an action
        if (!this.completedTurn) {
          this.step()
        }

        return
      }

      this.terminatedMain = true
    }
  }

  handlesEvent () {
    return this.mainEngine !== this.currentEngine
  }
}

module.exports = Agent
