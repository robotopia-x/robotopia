const game = require('../utils/game')
const initialState = require('./initial-state')
const { movable } = require('./components/movable')
const { markerCreator } = require('./components/marker-creator')
const { collector } = require('./components/collector')

module.exports = game.engine({
  state: initialState,
  components: {
    movable,
    markerCreator,
    collector
  }
})
