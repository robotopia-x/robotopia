const _ = require('lodash')
const update = require('immutability-helper')
const p2pPresenter = require('./p2p-presenter')
const OneonOne = require('../../assets/levels/1on1')

module.exports = ({ hubUrl }) => {
  const presenter = p2pPresenter({
    hubUrl
  })

  return {
    namespace: 'presenter',

    state: {
      groupId: null,
      clients: {}, // clients [{ id, code, username }] mapped to their id
      playerNumbers: {}, //maps playerNumbers to Client. eg.: 1->eflajsnf1248dsnf
      gameActive: false
    },

    reducers: {
      addClient: (state, { id }) => {
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
      },

      removeClient: (state, { id }) =>
        update(state, {
          clients: { $set: _.omit(state.clients, [id]) }
        }),

      setUsername: (state, { id, username }) =>
        update(state, {
          clients: {
            [id]: {
              username: { $set: username }
            }
          }
        }),

      commitCode: (state, { id, code }) =>
        update(state, {
          clients: {
            [id]: {
              code: { $set: code }
            }
          }
        }),

      setPlayers: ( state, players ) =>
        update(state, {
          playerNumbers: { $set: players }
        }),

      _setGameState: ( state, gameRunning ) =>
        update(state, {
          gameActive: { $set: gameRunning }
        }),

      _setGroupId: (state, { groupId }) => {
        console.log('set GroupId', groupId, update(state, {
          groupId: { $set: groupId },
          clients: { $set: {} }
        }))
        return update(state, {
          groupId: { $set: groupId },
          clients: { $set: {} }
        })
      }
    },

    effects: {
      disconnect: (state, data, send) => {
        presenter.stop()
        send('presenter:_setGroupId', { groupId: null }, _.noop)
      },

      joinGroup: (state, { groupId }, send) => {
        presenter.joinStar(groupId)
        send('presenter:_setGroupId', { groupId }, _.noop)
      },

      startMatch: ( { clients }, playerCount, send, done ) => {
        let clientIds = Object.keys(clients)
        let players = {}
        if (clientIds.length < playerCount) {
          return
        }
        for (var i = 1; i <= playerCount; i++) {
          let nextIndex = Math.random() * clientIds.length
          let nextPlayer = clientIds.splice(nextIndex, 1)
          players[i] = nextPlayer[0]
        }
        send('presenter:setPlayers', players, _.noop)

        for (var p in players) {
          send('runtime:commitCode', { code: clients[players[p]].code, groupId: p }, _.noop)
        }
        send('presenter:_setGameState', true, _.noop)
        send('clock:start', null, _.noop)
      },

      stopMatch: ( { clients }, data, send ) => {
        send('presenter:_setGameState', false, _.noop)
        send('clock:stop', null, _.noop)
        send('runtime:reset', { loadState: OneonOne }, _.noop)
        send('game:loadGameState', { loadState: OneonOne }, _.noop)
      },

      handleMessage: ({ clients }, { id, message }, send) => {
        console.log('handle message', id, message)

        if (!clients[id]) {
          return
        }

        switch (message.type) {
          case 'SET_USERNAME':
            const username = message.data.username
            send('presenter:setUsername', { id, username }, _.noop)
            return

          case 'COMMIT_CODE':
            const code = message.data.code
            send('presenter:commitCode', { id, code }, _.noop)
            return

          default:
            return
        }
      }
    },

    subscriptions: {
      p2pConnection: (send) => {
        presenter.onAddClient(({ id }) => send('presenter:addClient', { id }, _.noop))
        presenter.onRemoveClient(({ id }) => send('presenter:removeClient', { id }, _.noop))
        presenter.onMessage((id, { type, data }) =>
          send('presenter:handleMessage', { id, message: { type, data } }, _.noop))
      }
    }
  }
}
