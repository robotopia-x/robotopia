const gameState = require('./game/game-state')
const reducers = require('./reducers')
const effects = require('./effects')

const initialState = {
  robot: { x: 0, y: 0 },
  running: false,
  srcCode: '',
  game: gameState
}

module.exports = {
  state: initialState,
  effects,
  reducers
}
