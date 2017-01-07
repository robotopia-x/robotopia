const game = require('../../lib/game')
const { movable } = require('./components/movable')
const { health } = require('./components/health')
const { collector } = require('./components/collector')
const { markerSpawner, towerSpawner, robotSpawner } = require('./components/spawner')
const reducers = require('./reducers')
const initialState = require('./initial-state')

module.exports = game.model({
  state: initialState,
  components: {
    movable,
    health,
    collector,
    markerSpawner,
    towerSpawner,
    robotSpawner
  },
  reducers
})
