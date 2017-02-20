const _ = require('lodash')
const { getAllEntities } = require('../../../lib/game')

module.exports = {
  shooter: {
    requires: ['team'],

    reducers: {
      _setTarget: (state, { targetId }) => {
        return {
          shooter: { targetId: { $set: targetId } }
        }
      }
    },

    effects: {
      update: (state, data, game, send) => {
        const target = getWeakestEnemyInRange(game, state)
        let targetId = null

        if (target !== undefined) {
          targetId = target.id

          send('game:health.damage', {
            target: targetId,
            data: { amount: state.shooter.damage }
          }, _.noop)
        }

        send('game:shooter._setTarget', {
          target: state.id,
          data: { targetId }
        }, _.noop)
      }
    }
  }
}

function getWeakestEnemyInRange (game, { shooter, team, position }) {
  const entities = getAllEntities('health', game)

  return (
    _(entities)
    .filter((entity) => {
      if (entity.team.id === team.id) {
        return false
      }

      const distance = Math.sqrt(Math.pow(entity.position.x - position.x, 2) + Math.pow(entity.position.y - position.y, 2))
      return distance < shooter.range
    })
    .sortBy(['health'])
    .first()
  )
}
