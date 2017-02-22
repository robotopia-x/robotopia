const _ = require('lodash')
const initialState = require('../../pages/presenter/initial-state')
const testCode = 'robot.onEvent(\'discover resource\', function (resource) {\n  robot.moveTo((resource.position.x), (resource.position.y))\n robot.placeMarker(\'green\', 2)\n\n})\n\nrobot.onMode(\'green\', function (marker) {\n  robot.moveTo((marker.position.x), (marker.position.y))\n  robot.collectResource()\n  robot.moveTo((robot.getBasePosition().x), (robot.getBasePosition().y))\n  robot.depositResource()\n\n})\n\nif (1 < getRandomNumber(1, 4)) {\n  robot.rotate("LEFT")\n  if (1 < getRandomNumber(1, 3)) {\n    robot.rotate("LEFT")\n    if (1 < getRandomNumber(1, 2)) {\n      robot.rotate("LEFT")\n    }\n  }\n}\nwhile (true) {\n  robot.move("FORWARD")\n  if (10 == getRandomNumber(1, 8)) {\n    robot.rotate("LEFT")\n  }\n}\n'

module.exports = ({presenter, timer}) => {
  return {
    disconnect,
    joinGroup,
    startMatch,
    stopMatch,
    _testMode,
    handleMessage,
    pickPlayers
  }

  function disconnect (state, data, send) {
    presenter.stop()
    send('presenter:_setGroupId', { groupId: null }, _.noop)
  }

  function joinGroup (state, { groupId }, send) {
    presenter.joinStar(groupId)
    send('presenter:_setGroupId', { groupId }, _.noop)
  }

  function startMatch ({ clients, playerNumbers, time }, data, send, done) {
    const playerKeys = Object.keys(playerNumbers)
    const showPreFight = playerKeys.length === 2 && playerKeys.indexOf('1') !== -1 && playerKeys.indexOf('2') !== -1

    for (let p in playerNumbers) {
      send('runtime:commitCode', { code: clients[playerNumbers[p]].code, groupId: p }, _.noop)
    }

    send('presenter:_setPickingPlayers', {displayPlayerPickScreen: false}, _.noop)

    if (showPreFight) {
      send('prepfight:setLeft', { name: clients[playerNumbers[1]].username }, _.noop)
      send('prepfight:setRight', { name: clients[playerNumbers[2]].username }, _.noop)
      send('prepfight:start', null, _.noop)
    }

    send('runtime:reset', { loadState: initialState.game }, _.noop)
    send('game:loadGameState', { loadState: initialState.game }, _.noop)
    send('game:initializeResourceSpots', { numberOfSpots: 12, value: 100, chunks: 20, color: 'BLUE', requiredDistance: 5 }, _.noop)

    setTimeout(() => {
      send('clock:start', null, _.noop)
      timer.onTick(updateTime(time, send))
      timer.start()
    }, showPreFight ? 4000 : 0)
  }

  function stopMatch (state, data, send) {
    send('clock:stop', null, _.noop)
    timer.stop()
  }

  function _testMode (state, data, send) {
    send('presenter:addClient', { id: 1 }, _.noop)
    send('presenter:setUsername', {id: 1, username: 'Rick'}, _.noop)
    send('presenter:commitCode', {id: 1, code: testCode}, _.noop)
    send('presenter:addClient', { id: 2 }, _.noop)
    send('presenter:setUsername', {id: 2, username: 'Morty'}, _.noop)
    send('presenter:commitCode', {id: 2, code: testCode}, _.noop)
  }

  function handleMessage ({ clients }, { id, message }, send) {
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

  function pickPlayers (state, { playerCount, selectionMode }, send) {
    if (!playerCount) {
      return send('presenter:_setPickingPlayers', {displayPlayerPickScreen: false}, _.noop)
    }
    let players = {}
    if (selectionMode === 'random') {
      let clientIds = Object.keys(state.clients)
      if (clientIds.length >= playerCount) {
        for (let i = 1; i <= playerCount; i++) {
          let nextIndex = Math.random() * clientIds.length
          let nextPlayer = clientIds.splice(nextIndex, 1)
          players[i] = nextPlayer[0]
        }
      }
      send('presenter:setPlayers', players, _.noop)
      send('presenter:startMatch', null, _.noop)
      return
    }
    send('presenter:_setPickingPlayers', {displayPlayerPickScreen: true, playerCount}, _.noop)
  }
}

function updateTime (timeRemaining, send) {
  return () => {
    timeRemaining -= 1
    if (timeRemaining === 0) {
      send('presenter:stopMatch', null, _.noop)
      send('presenter:showWinDialog', true, _.noop)
    }
    send('presenter:setTime', timeRemaining, _.noop)
  }
}
