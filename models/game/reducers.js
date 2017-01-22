function addResources ({ teams }, { teamId, amount }) {
  return {
    teams: { [teamId]: { resources: { $set: teams[teamId].resources + amount } } }
  }
}

function removeResources ({ teams }, { teamId, amount }) {
  return {
    teams: { [teamId]: { resources: { $set: teams[teamId].resources + amount } } }
  }
}

function addPoints ({ teams }, { teamId, amount }) {
  return {
    teams: { [teamId]: { points: { $set: teams[teamId].points + amount } } }
  }
}

module.exports = {
  addResources,
  removeResources,
  addPoints
}
