const reducers = require('./reducers')
const effects = require('./effects')
const gameGrid = require('./utils/gamegrid')

const initialState = {
  robot: { x: 5, y: 5 },
  running: false,
  srcCode: '',
  gameGrid: gameGrid.createGrid(25, 25)
}

module.exports = {
  state: initialState,
  effects,
  reducers
}
