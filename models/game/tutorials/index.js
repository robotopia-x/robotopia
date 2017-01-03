const game = require('../../../lib/utils/game')
const { movable } = require('../components/movable')
const { collector } = require('../components/collector')
const { spawner } = require('../components/spawner')
const reducers = require('../reducers')

const initialState = require('../initial-state')
const tutorial1State = require('./tutorial-1-state')
const tutorial2State = require('./tutorial-2-state')

module.exports = [
  initialState,
  tutorial1State,
  tutorial2State
]
