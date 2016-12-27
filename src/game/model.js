const game = require('../utils/game')
const initialState = require('./initial-state')
const { movable } = require('./components/movable')
const { collector } = require('./components/collector')
const { spawner } = require('./components/spawner')
const reducers = require('./reducers')

module.exports = game.engine({
  state: initialState,
  components: {
    movable,
    collector,
    spawner
  },
  reducers
})
