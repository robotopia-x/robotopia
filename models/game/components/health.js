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
      update: (state, data, game, send) => {

        if (state.health.current < 5) {
          send('game:health.heal', { target: state.id, data: { amount: 3 } }, _.noop)
        }

        send('game:health.damage', { target: state.id, data: { amount: 1 } }, _.noop)
      },

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

        send('game:deleteEntity', { data: { id: state.id } }, _.noop)
      }
    }
  }
}
