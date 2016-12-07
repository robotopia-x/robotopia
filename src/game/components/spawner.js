const _ = require('lodash')
const entities = require('../entities')

module.exports = {
  spawner: {
    requires: ['position'],

    effects: {
      spawn: (params, { position, spawner }, game, send) => {
        const paramsWithPosition = _.assign({}, params, { x: position.x, y: position.y })
        const entitiy = entities[spawner.type](paramsWithPosition)

        send('game:createEntity', { data: entitiy }, _.noop)

        return {}
      }
    }
  }
}

