const game = require('../../lib/utils/game')
const { movable } = require('./components/movable')
const { collector } = require('./components/collector')
const { markerSpawner, robotSpawner } = require('./components/spawner')
const reducers = require('./reducers')
const initialState = require('./initial-state')

module.exports = game.engine({
  state: initialState,
  components: {
    movable,
    collector,
    markerSpawner,
    robotSpawner
  },
  reducers
})
