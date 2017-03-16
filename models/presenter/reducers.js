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

function _setGroupId (state, { groupId }) {
  return update(state, {
    groupId: { $set: groupId },
    clients: { $set: {} }
  })
}

function setTime (state, newTime) {
  return update(state, {
    time: { $set: newTime }
  })
}

function showWinDialog (state, show) {
  return update(state, {
    displayWinDialog: { $set: show }
  })
}

function _setPickingPlayers (state, { displayPlayerPickScreen, playerCount }) {
  state = update(state, {
    displayPlayerPickScreen: { $set: displayPlayerPickScreen }
  })
  if (!_.isNil(playerCount)) {
    update(state, {
      playerCount: { $set: playerCount }
    })
  }
  return state
}

module.exports = {
  addClient,
  removeClient,
  setUsername,
  commitCode,
  setPlayers,
  _setGroupId,
  setTime,
  showWinDialog,
  _setPickingPlayers
}
