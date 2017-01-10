const setResource = (state, { teamId, amount }) => {
  return { resources: { [teamId]: { $set: amount } } }
}

module.exports = {
  setResource
}
