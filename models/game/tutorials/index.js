const game = require('../../../lib/utils/game')
const { movable } = require('../components/movable')
const { collector } = require('../components/collector')
const { spawner } = require('../components/spawner')
const reducers = require('../reducers')

const initialState = require('./initial-state')
const tutorial1State = require('./tutorial-1-state')
const tutorial2State = require('./tutorial-2-state')

module.exports = [
  {
    state: initialState.state,
    workspace: initialState.workspace,
    toolbox: initialState.toolbox
  },

  {
    state: tutorial1State.state,
    workspace: tutorial1State.workspace,
    toolbox: tutorial1State.toolbox
  },

  {
    state: tutorial2State.state,
    workspace: tutorial2State.workspace,
    toolbox: tutorial2State.toolbox
  }
]
