function addResources ({ resources }, { teamId, amount }) {
  return {
    resources: { [teamId]: { $set: resources[teamId] + amount } }
  }
}

function removeResources ({ resources }, { teamId, amount }) {
  return {
    resources: { [teamId]: { $set: resources[teamId] + amount } }
  }
}

function addGamePoints ({ gamePoints }, { teamId, amount }) {
  return {
    gamePoints: { [teamId]: { $set: gamePoints[teamId] + amount } }
  }
}

module.exports = {
  addResources,
  removeResources,
  addGamePoints
}
