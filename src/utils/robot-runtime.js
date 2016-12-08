const _ = require('lodash')
const uid = require('uid')
const esper = require('esper.js')

class RobotRuntime {

  constructor () {
    this.robots = {}
  }

  connect (send) {
    this.send = send
  }

  spawnRobot ({ spawnerId, api, code }) {
    const id = uid()

    this.send('game:spawner.spawn', {
      target: spawnerId,
      data: { id }
    }, _.noop)

    this.robots[id] = new Robot({ id, api, code, send: this.send })
  }

  triggerEvent (name, args) {
    _.forEach(this.robots, (robot) => robot.triggerEvent(name, args))
  }

  step () {
    _.forEach(this.robots, (robot, id) => {
      robot.step()

      if (robot.hasTerminated()) {
        this.send('game:deleteEntity', { data: { id } }, _.noop)
        delete this.robots[id]
      }
    })
  }
}

class Robot {

  constructor ({ id, api, code, send }) {
    this.currentEngine = this.mainEngine = new esper.Engine()
    this.id = id
    this.send = send
    this.completedTurn = true
    this.terminatedMain = false

    this.loadCode(code)
    this.addAPI(api)
  }

  addAPI ({ namespace, actions }) {
    this.namespace = namespace
    this.engine.addGlobal(namespace, this.getAPIObject(actions))
  }

  // turns action definitions in functions which can be called by the Robot code
  getAPIObject (actions) {
    return _.reduce(actions, (api, method, name) => {
      api[name] = (...params) => {
        const [action, data] = method.apply(null, params)

        this.send(action, { target: this.id, data }, _.noop)

        this.completedTurn = true
      }

      return api
    }, {})
  }

  loadCode (code) {
    this.terminatedMain = false
    this.engine.load(code)
  }

  triggerEvent (name, args) {
    if (this.handlesEvent) {
      return
    }

    const eventHandlerName = `on${_.capitalize(name)}`

    // skip if robot program has no event handler
    if (!_.isFunction(this.currentEngine.globalScope.get(this.namespace).native[eventHandlerName])) {
      return
    }

    // create separate engine which shares all the state with the main engine
    // the code of the engine just calls the event handler
    this.currentEngine = this.currentEngine.fork()
    this.currentEngine.load(`${this.name}.${eventHandlerName}.apply(args)`)
    this.handlesEvent = true
  }

  step () {
    if (this.terminatedMain && !this.handlesEvent) {
      return
    }

    let completed = false

    do {
      completed = this.currentEngine.step()
    } while (!completed && !this.completedTurn)

    if (completed && this.handlesEvent) {
      this.currentEngine = this.mainEngine
      return
    }

    this.terminatedMain = true
  }
}

module.exports = new RobotRuntime()
