const entities = require('../entities')

module.exports = {
  tiles: [
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1]
  ],

  stepProgress: 0,

  entities: [
    entities.base({ x: 2, y: 5, id: 'BASE' }),
    entities.robot({ x: 2, y: 5, id: 'ROBOT'}),
    entities.gem({ x: 0, y: 0 })
  ]
}
