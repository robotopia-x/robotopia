const _ = require('lodash')

module.exports = {
  markerCreator: {
    requires: ['position'],

    effects: {
      placeMarker: (data, state, game, send) => {
        send('game:createEntity', {
          data: getMarker(state.position.x, state.position.y)
        }, _.noop)

        return state
      }
    }
  }
}

function getMarker (x, y) {
  return {
    position: { x, y },
    renderer: {
      type: 'SIMPLE',
      data: {
        sprite: 'MARKER'
      }
    }
  }
}
