const setResource = (state, { teamId, amount }) => {
  return { resources: { [teamId]: { $set: amount } } }
}

const setGamePoints = (state, { teamId, amount }) => {
  return { gamePoints: { [teamId]: { $set: amount } } }
}

module.exports = {
  setResource,
  setGamePoints
}
