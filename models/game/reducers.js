const update = require('immutability-helper')

const setResource = (state, { teamId, amount }) => {
  return update(state, { [teamId]: { $set: amount } })
}

module.exports = {
  setResource
}
