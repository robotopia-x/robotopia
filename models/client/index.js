/* globals localStorage */
const _ = require('lodash')
const cuid = require('cuid')
const update = require('immutability-helper')
const p2pClient = require('./p2p-client')

module.exports = ({ hubUrl }) => {
  const client = p2pClient({
    hubUrl,
    cid: cuid()
  })

  return {
    namespace: 'client',

    state: getStateFromLocalStorage(),

    reducers: {
      setUsername: (state, { username }) => {
        state.username = username
        localStorage.setItem('roboSession', JSON.stringify(state))
        return state
      },

      _setGroupId: (state, { groupId }) => {
        state.groupId = groupId
        localStorage.setItem('roboSession', JSON.stringify(state))
        return state
      },

      _setConnectionStatus: (state, { connected, connecting }) =>
        update(state, {
          connected: { $set: connected },
          connecting: { $set: connecting }
        }),

      denyRecovery: (state) => {
        localStorage.setItem('roboSession', '')
        state.username = null
        state.groupId = null
        state.clientId = null
        state.connecting = false
        state.recoveryPossible = false
        return state
      },

      _setClientId: (state, { clientId }) => {
        console.log(clientId)
        state.clientId = clientId
        localStorage.setItem('roboSession', JSON.stringify(state))
        return state
      }
    },

    effects: {
      disconnect: (state, data, send) => {
        client.stop()
        send('client:_setGroupId', { groupId: null }, _.noop)
        send('client:setUsername', { username: null }, _.noop)
      },

      joinGroup: (state, { groupId }, send) => {
        client.joinStar(groupId, state.clientId)
        send('client:_setGroupId', { groupId }, _.noop)
      },

      sendCode: (state, { code }) => {
        client.send({
          type: 'COMMIT_CODE',
          data: { code }
        })
      },

      sendUsername: ({ username }) => {
        client.send({
          type: 'SET_USERNAME',
          data: { username }
        })
      }
    },

    subscriptions: {
      p2pConnection: (send) => {
        client.onConnect((groupId, clientId) => {
          send('client:_setConnectionStatus', { connected: true, connecting: false }, _.noop)
          send('client:_setClientId', { clientId: clientId }, _.noop)
          send('client:sendUsername', { }, _.noop)
        })

        client.onDisconnect(() => {
          send('client:_setConnectionStatus', { connected: false, connecting: true }, _.noop)
        })

        client.onConnecting(() => {
          send('client:_setConnectionStatus', { connected: false, connecting: true }, _.noop)
        })
      }
    }
  }
}

function getStateFromLocalStorage () {
  let localState = {
    username: null,
    groupId: null,
    clientId: null,
    connecting: false,
    recoveryPossible: false
  }
  try {
    let session = JSON.parse(localStorage.getItem('roboSession'))
    if (!session || !session.username || !session.groupId || !session.clientId) {
      return localState
    }
    localState.username = session.username
    localState.groupId = session.groupId
    localState.clientId = session.clientId
    localState.recoveryPossible = true
  } catch (e) {
    console.log('Error loading local Storage')
  }
  return localState
}
