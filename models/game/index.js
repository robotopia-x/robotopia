const game = require('../../lib/game')
const { movable } = require('./components/movable')
const { health } = require('./components/health')
const { collector } = require('./components/collector')
const { markerSpawner, towerSpawner, robotSpawner } = require('./components/spawner')
const { shooter } = require('./components/shooter')
const { discoverable } = require('./components/discoverable')
const reducers = require('./reducers')
const effects = require('./effects')
const initialState = require('./initial-state')

module.exports = game.model({
  state: initialState,
  components: {
    movable,
    health,
    collector,
    markerSpawner,
    towerSpawner,
    robotSpawner,
    shooter,
    discoverable
  },
  effects,
  reducers
})
