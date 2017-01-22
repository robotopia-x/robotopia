const html = require('choo/html')
const sf = require('sheetify')
const modal = require('../elements/modal')
const button = require('../elements/button')
const _ = require('lodash')
const { startButtonView } = require('../elements/presenter-controls')

module.exports = function ({ presenter }, prev, send) {
  if (presenter.groupId === null) {
    return joinGroupDialog({
      onJoinGroup: (groupId) => {
        send('presenter:joinGroup', { groupId })
      }
    })
  }

  const disconnectButtonHtml = button({
    label: 'Exit',
    onClick: () => send('presenter:disconnect')
  })

  const startButtonHtml = startButtonView({
    isRunning: presenter.gameActive,
    onStart: () => send('presenter:startMatch', 2),
    onStop: () => {console.log('should stop now.')}
  })

  return html`
<div class="presenter">

  <div class="clientList">
  <h3>Clients</h3>
    ${listClients (presenter)}
  </div>
    <div class="gameView">
    
    </div>
    <div class="footer">
      ${disconnectButtonHtml} ${startButtonHtml}
    </div>
  </div>
`
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