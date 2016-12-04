const _ = require('lodash')
const esper = require('esper.js')

const { MOVE, ROTATE } = require('../utils/types')

class Robot {

  constructor ({ api, id }) {
    this.engine = new esper.Engine()
    this.id = id
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

  connect (send) {
    this.send = send
  }

  loadCode (code) {
    this.engine.load(code)
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

const api = {
  move: (direction) => ['game:movable.move', { direction: MOVE[direction] }],
  rotate: (direction) => ['game:movable.rotate', { direction: ROTATE[direction] }],
  placeMarker: () => ['game:markerCreator.placeMarker']
}

module.exports = new Robot({ id: 'robot', api })
