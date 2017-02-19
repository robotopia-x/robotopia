const game = require('@robotopia/choo-game')
const { movable } = require('./components/movable')
const { health } = require('./components/health')
const { collector } = require('./components/collector')
const { markerSpawner, towerSpawner, robotSpawner } = require('./components/spawner')
const { shooter } = require('./components/shooter')
const { discoverable } = require('./components/discoverable')
const { worker, task } = require('./components/work')
const reducers = require('./reducers')
const effects = require('./effects')

module.exports = game.model({
  state: {
    tiles: [[]],
    entities: [],
    teams: {}
  },
  components: {
    movable,
    health,
    collector,
    markerSpawner,
    towerSpawner,
    robotSpawner,
    shooter,
    discoverable,
    worker,
    task
  },
  effects,
  reducers
})
