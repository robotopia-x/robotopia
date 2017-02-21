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
    handleMessage
  }

  function disconnect (state, data, send) {
    presenter.stop()
    send('presenter:_setGroupId', { groupId: null }, _.noop)
  }

  function joinGroup (state, { groupId }, send) {
    presenter.joinStar(groupId)
    send('presenter:_setGroupId', { groupId }, _.noop)
  }

  function startMatch ({ clients }, playerCount, send, done) {
    let clientIds = Object.keys(clients)
    let players = {}
    if (clientIds.length < playerCount) {
      return
    }
    for (let i = 1; i <= playerCount; i++) {
      let nextIndex = Math.random() * clientIds.length
      let nextPlayer = clientIds.splice(nextIndex, 1)
      players[i] = nextPlayer[0]
    }
    send('presenter:setPlayers', players, _.noop)

    for (let p in players) {
      send('runtime:commitCode', { code: clients[players[p]].code, groupId: p }, _.noop)
    }

    send('prepfight:setLeft', { name: clients[players[1]].username }, _.noop)
    send('prepfight:setRight', { name: clients[players[2]].username }, _.noop)
    send('runtime:reset', { loadState: initialState.game }, _.noop)
    send('game:loadGameState', { loadState: initialState.game }, _.noop)
    send('game:initializeResourceSpots', { numberOfSpots: 8, value: 100, chunks: 20, color: 'GREEN' }, _.noop)
    send('presenter:_updateTime', 0, _.noop)
    send('prepfight:start', null, _.noop)
    setTimeout(() => {
      send('presenter:_setGameState', true, _.noop)
      send('clock:start', null, _.noop)
      timer.onTick(updateTime(send))
      timer.start()
    }, 4000)
  }

  function stopMatch ({ clients }, data, send) {
    send('presenter:_setGameState', false, _.noop)
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
}

function updateTime (send) {
  let timePassed = 0
  return () => {
    timePassed += 1
    send('presenter:_updateTime', timePassed, _.noop)
  }
}
