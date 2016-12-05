const _ = require('lodash')

module.exports = {
  collectable: {
    requires: ['position'],

    effects: {
      collectResource: (data, state, game, send) => {
        send('game:deleteEntity', {
          data: { x: state.position.x, y: state.position.y }
        }, _.noop)

        return {}
      }
    }
  }
}

