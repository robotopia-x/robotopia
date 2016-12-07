const _ = require('lodash')
const uid = require('uid')
const esper = require('esper.js')

class RobotRuntime {

  constructor () {
    this.robots = {}
    this.terminated = false
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

  reloadRobotCode (id, code) {
    this.robots[id].loadCode(code)
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

  hasTerminated () {
    return _.every(this.robots, (robot) => robot.hasTerminated())
  }
}

class Robot {

  constructor ({ id, api, code, send }) {
    this.engine = new esper.Engine()
    this.id = id
    this.send = send
    this.completedTurn = true
    this.terminated = false

    this.loadCode(code)
    this.addAPI(api)
  }

  addAPI ({ name, actions }) {
    this.engine.addGlobal(name, this.getAPIObject(actions))
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
    this.terminated = false
    this.engine.load(code)
  }

  step () {
    if (this.terminated) {
      return
    }

    this.completedTurn = false

    do {
      this.terminated = this.engine.step()
    } while (!this.terminated && !this.completedTurn)
  }

  hasTerminated () {
    return this.terminated
  }
}

module.exports = new RobotRuntime()
