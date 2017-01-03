const game = require('../../../lib/utils/game')
const { movable } = require('../components/movable')
const { collector } = require('../components/collector')
const { spawner } = require('../components/spawner')
const reducers = require('../reducers')

const tutorial1State = require('./tutorial-1-state')

module.exports = game.engine({
  state: tutorial1State,
  components: {
    movable,
    collector,
    spawner
  },
  reducers
})
