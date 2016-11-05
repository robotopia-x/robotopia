const update = require('immutability-helper')

const move = ({ direction }, state) => {
  let { robot: { x, y } } = state

  switch (direction) {
    case 'UP':
      y = y - 10
      break
    case 'DOWN':
      y = y + 10
      break
    case 'LEFT':
      x = x - 10
      break
    case 'RIGHT':
      x = x + 10
      break
  }

  return update(state, {
    robot: {
      x: { $set: x },
      y: { $set: y }
    }
  })
}

const changeRunningState = ({ running }, state) => {
  return update(state, { running: { $set: running } })
}

const updateCode = ({ srcCode }, state) => {
  console.log('update code')
  return update(state, { srcCode: { $set: srcCode } })
}

module.exports = {
  move,
  changeRunningState,
  updateCode
}
