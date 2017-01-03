const _ = require('lodash')
const entities = require('../entities')

module.exports = {
  spawner: {
    requires: ['position'],

    effects: {
      spawn: ({ position, spawner }, params, game, send) => {
        const paramsWithPosition = _.assign({}, params, { x: position.x, y: position.y })
        const entitiy = entities[spawner.type](paramsWithPosition)

        send('game:createEntity', { data: entitiy }, _.noop)
        send('runtime:triggerEvent', {
          name: `create${_.capitalizeFirstLetter(spawner.type)}`,
          args: [ entitiy ]
        }, _.noop)
      }
    }
  }
}
