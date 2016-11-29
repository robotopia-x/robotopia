const gameState = require('./game/game-state')
const reducers = require('./reducers')
const effects = require('./effects')

const initialState = {
  robot: { x: 0, y: 0 },
  running: false,
  srcCode: '',
  workspace: '',
  game: gameState,
  canvas: {
    pan: { x: 0, y: 0 },
    zoom: 1250
  }
}

module.exports = {
  state: initialState,
  effects,
  reducers
}
