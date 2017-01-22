const html = require('choo/html')
const sf = require('sheetify')
const modal = require('../../elements/modal')
const button = require('../../elements/button')
const _ = require('lodash')
const { startButtonView } = require('../../elements/presenter-controls')
const gameView = require('../../elements/game/index')
const gameStatsView = require('../../elements/gameStats')
const OneonOne = require('../../assets/levels/1on1')

module.exports = function ({ presenter, game, clock }, prev, send) {
  if (presenter.groupId === null) {
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

  const disconnectButtonHtml = button({
    label: 'Exit',
    onClick: () => send('presenter:disconnect')
  })

  const startButtonHtml = startButtonView({
    isRunning: presenter.gameActive,
    onStart: () => send('presenter:startMatch', 2),
    onStop: () => send('presenter:stopMatch')
  })

  return html`
<div class="presenter">

  <div class="clientList">
  <h3>Clients</h3>
    ${listClients (presenter)}
  </div>
    <div class="gameView" onload=${initGame}>
        ${gameHtml}
        ${gameStatsHtml}
    </div>
    <div class="footer">
      ${disconnectButtonHtml} ${startButtonHtml}
    </div>
  </div>
`

  function initGame () {
    send('game:loadGameState', { loadState: OneonOne })
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