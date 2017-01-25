const html = require('choo/html')
const sf = require('sheetify')
const modal = require('../../elements/modal')
const button = require('../../elements/button')
const _ = require('lodash')
const { startButtonView } = require('../../elements/presenter-controls')
const gameView = require('../../elements/game/index')
const gameStatsView = require('../../elements/game-stats')
const prepfight = require('../../node_modules/action-overlay')('prepfight').view
const OneonOne = require('../../assets/levels/1on1')
const DEV_MODE = true

module.exports = function (state, prev, send) {
  let presenter = state.presenter
  let game = state.game
  let clock = state.clock
  if (presenter.groupId === null) {
    if (DEV_MODE) {
      send('presenter:joinGroup', { groupId: 'asd' })
      send('presenter:_testMode')
    }
    return joinGroupDialog({
      onJoinGroup: (groupId) => {
        send('presenter:joinGroup', { groupId })
      }
    })
  }

  const gameHtml = gameView({
    state: game,
    progress: clock.progress
  })

  const gameStatsHtml = gameStatsView({
    gamePoints: game.current.gamePoints,
    resources: game.current.resources
  })

  const prepfightHtml = prepfight(state, prev, send)

  const disconnectButtonHtml = button({
    label: 'Exit',
    onClick: () => send('presenter:disconnect')
  })

  const startButtonHtml = startButtonView({
    isRunning: presenter.gameActive,
    onStart: () => {
      send('presenter:startMatch', 2)
    },
    onStop: () => send('presenter:stopMatch')
  })

  return html`
<div class="presenter">
  ${prepfightHtml}
  <div class="clientList">
  <h3>Clients</h3>
    ${listClients (presenter)}
  </div>
    <div class="gameView" onload=${onLoad}>
        ${gameHtml}
        ${gameStatsHtml}
    </div>
    <div class="footer">
      ${disconnectButtonHtml} ${startButtonHtml}
    </div>
  </div>
`

  function onLoad () {
    send('clock:stop')
    send('game:loadGameState', { loadState: OneonOne })

    send( 'prepfight:setLeft', {img: '../../assets/img/robot/robot_rick_right.png', name: 'left'})
    send( 'prepfight:setRight', {img: '../../assets/img/cyborg/cyborg_rick_left.png', name: 'right'})
    send( 'prepfight:setVS', {img: 'http://vignette2.wikia.nocookie.net/mortalkombat/images/6/64/Vs.png/revision/latest?cb=20150319161124&path-prefix=de'})
    send( 'prepfight:setDurations', {up: 1000, down: 1000, stay: 1500})
  }

}

function joinGroupDialog ({ onJoinGroup }) {
  const buttonHTML = button({
    label: 'submit'
  })

  return modal(html`
    <div>
      <p>To continue please enter a rather unique name for your group or create one!!</p>
      <form onsubmit=${handleSubmit}>
          <input type="text" name="groupId" autofocus>
          ${buttonHTML}
      </form>
    </div>
  `)

  function handleSubmit (evt) {
    const formData = new FormData(evt.target)
    const groupId = formData.get('groupId')

    evt.preventDefault()

    onJoinGroup(groupId)
  }
}

function listClients( {clients, playerNumbers} ) {
  return html`
    <ul>
        ${Object.keys(clients).map(clientToLi)}
    </ul>
  `

  function clientToLi(key) {
    let isPlayer = false
    if (_.valuesIn(playerNumbers).indexOf(key) >= 0) {
      isPlayer = true
    }
    return html`<li>${clients[key].username} ${isPlayer ? 'p' : ''}</li>`
  }

}