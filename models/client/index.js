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

    state: {
      username: null,
      groupId: null,
      connected: false
    },

    reducers: {
      setUsername: (state, { username }) =>
        update(state, {
          username: { $set: username }
        }),

      _setGroupId: (state, { groupId }) =>
        update(state, {
          groupId: { $set: groupId }
        }),

      _setConnectionStatus: (state, { connected }) =>
        update(state, {
          connected: { $set: connected }
        })
    },

    effects: {
      disconnect: (state, data, send) => {
        client.stop()
        send('client:_setGroupId', { groupId: null }, _.noop)
      },

      joinGroup: (state, { groupId }, send) => {
        if (state.username === null || state.groupId !== null) {
          return
        }

        client.joinStar({ gid: groupId })
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
        client.onConnect(() => {

          send('client:_setConnectionStatus', { connected: true }, _.noop)
          send('client:sendUsername', { }, _.noop)
        })

        client.onDisconnect(() => {
          send('client:_setConnectionStatus', { connected: false }, _.noop)
        })
      }
    }
  }
}
