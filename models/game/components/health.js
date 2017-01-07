const _ = require('lodash')
const update = require('immutability-helper')

module.exports = {
  health: {
    requires: [],

    reducer: {
      heal: (state, { amount }) => {
        const newHealth = Math.min(state.health.max, state.health.current + amount)

        return update(state, {
          current: { $set: newHealth }
        })
      },

      _set: (state, { health }) => {
        return update(state, {
          current: { $set: health }
        })
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
          })
        }

        send('game:deleteEntity', { id: state.id }, _.noop)
      }
    }
  }
}
