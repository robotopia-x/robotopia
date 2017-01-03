const game = require('../../../lib/utils/game')
const { movable } = require('../components/movable')
const { collector } = require('../components/collector')
const { spawner } = require('../components/spawner')
const reducers = require('../reducers')

const tutorial1State = require('./tutorial-1-state')
const initialState = require('../initial-state')

module.exports = {
  1: game.engine({
    state: tutorial1State,
    components: {
      movable,
      collector,
      spawner
    },
    reducers
  }),

  2: game.engine({
    state: initialState,
    components: {
      movable,
      collector,
      spawner
    },
    reducers
  })
}
