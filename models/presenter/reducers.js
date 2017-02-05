const _ = require('lodash')
const update = require('immutability-helper')

function addClient (state, { id }) {
  const client = {
    id,
    username: 'unknown',
    code: null
  }

  return update(state, {
    clients: {
      [id]: { $set: client }
    }
  })
}

function removeClient (state, { id }) {
  return update(state, {
    clients: { $set: _.omit(state.clients, [id]) }
  })
}

function setUsername (state, { id, username }) {
  return update(state, {
    clients: {
      [id]: {
        username: { $set: username }
      }
    }
  })
}

function commitCode (state, { id, code }) {
  return update(state, {
    clients: {
      [id]: {
        code: { $set: code }
      }
    }
  })
}

function setPlayers (state, players) {
  return update(state, {
    playerNumbers: { $set: players }
  })
}

function _setGameState (state, gameRunning) {
  return update(state, {
    gameActive: { $set: gameRunning }
  })
}

function _setGroupId (state, { groupId }) {
  return update(state, {
    groupId: { $set: groupId },
    clients: { $set: {} }
  })
}

function _updateTime (state, newTime) {
  return update(state, {
    time: { $set: newTime }
  })
}

module.exports = {
  addClient,
  removeClient,
  setUsername,
  commitCode,
  setPlayers,
  _setGameState,
  _setGroupId,
  _updateTime
}