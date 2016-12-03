const _ = require('lodash')
const esper = require('esper.js')

const { MOVE, ROTATE } = require('../utils/types')

class RobotRuntime {

  constructor ({ code, api, id, send }) {
    this.engine = new esper.Engine()
    this.engine.load(code)
    this.id = id
    this.send = send
    this._completedTurn = true

    this.addAPI(api)
  }

  addAPI (api) {
    _.forEach(api, (method, name) =>
      this.engine.addGlobalFx(name, (...params) => {
        const [action, data] = method.apply(null, params)

        this.send(action, { target: this.id, data }, _.noop)

        this._completedTurn = true
      })
    )
  }

  step () {
    let terminated

    this._completedTurn = false

    do {
      terminated = this.engine.step()
    } while (!terminated && !this._completedTurn)

    return terminated
  }
}

const robotApi = {
  move: (direction) => ['game:movable.move', { direction: MOVE[direction] }],
  rotate: (direction) => ['game:movable.rotate', { direction: ROTATE[direction] }],
  placeMarker: () => ['game:markerCreator.placeMarker']
}

function run (code, send, done) {
  const engine = new RobotRuntime({
    id: 'robot',
    api: robotApi,
    code,
    send
  })

  send('changeRunningState', { running: true }, _.noop)

  function runRobot () {
    if (engine.step()) {
      return send('changeRunningState', { running: false }, _.noop)
    }

    setTimeout(runRobot, 500)
  }

  runRobot()
}

module.exports = {
  run
}
