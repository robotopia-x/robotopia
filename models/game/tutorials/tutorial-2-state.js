const entities = require('../entities')

module.exports = {
  tiles: [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ],

  stepProgress: 0,

  entities: [
    entities.base({ x: 0, y: 0, id: 'BASE' }),
    entities.robot({ x: 0, y: 0, id: 'ROBOT'}),
    entities.gem({ x: 6, y: 6 })
  ]
}
