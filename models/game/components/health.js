const _ = require('lodash')

module.exports = {
  health: {
    requires: [],

    reducers: {
      heal: (state, { amount }) => {
        const newHealth = Math.min(state.health.max, state.health.current + amount)

        return {
          health: { current: { $set: newHealth } }
        }
      },

      _set: (state, { health }) => {
        return {
          health: { current: { $set: health } }
        }
      }
    },

    effects: {
      damage: (state, { amount }, game, send) => {
        const newHealth = state.health.current - amount

        if (newHealth > 0) {
          send('game:health._set', {
            target: state.id,
            data: {
              health: newHealth
            }
          }, _.noop)
          return
        }

        send('game:deleteEntity', {
          data: { id: state.id }
        }, _.noop)

        // TODO: move this somewhere else
        send('runtime:destroyRobot', {
          id: state.id
        }, _.noop)
      }
    }
  }
}
