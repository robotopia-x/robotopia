/* globals FormData */
const _ = require('lodash')
const html = require('choo/html')
const modalView = require('./modal')
const buttonView = require('./button')
const sf = require('sheetify')

module.exports = function ({
  presenter,
  currentGame,
  onJoinGroup,
  onPlayersPicked,
  onCancelPlayerPicking,
  onCloseWinModal = _.noop
}) {
  if (!presenter.groupId) {
    return getCreationModal()
  }

  if (presenter.displayPlayerPickScreen) {
    return getPlayerPickingModal()
  }

  if (presenter.displayWinDialog) {
    return getWinModal()
  }

  return html`<div></div>`

  function getPlayerPickingModal () {
    const prefix = sf`
      :host {
        
      }
      
      :host form {
        display: inline-block;
      }
      
      :host .pick_select {
        height: 2em;
      }
      
      :host .pick_option {
        font-weight: 500;
      }
      
      :host .cancel {
        float: right
      }
`

    const startButton = buttonView({
      label: 'Start'
    })

    const cancelButton = buttonView({
      label: 'Cancel',
      onClick: onCancelPlayerPicking,
      additionalClasses: 'cancel'
    })

    return modalView(html`
      <div class="${prefix}">
        <h1 class="pick_header">Chose the players to battle.</h1>
        <form onsubmit=${handleSubmit}>
        ${clientsToOptions('1', presenter.clients, presenter.playerNumbers)}
        ${clientsToOptions('2', presenter.clients, presenter.playerNumbers)}
        ${startButton}
        </form>
        ${cancelButton}
      </div>
    `)

    function clientsToOptions (selectSuffix, clients, players) {
      return html`
        <select name="player${selectSuffix}" class="pick_select">
        <option selected disabled value="0">Player${selectSuffix}</option>
          ${Object.keys(clients).map(clientToOption)}
        </select>
      `

      function clientToOption (clientId) {
        // let isSelected = players[selectSuffix] === clientId
        return html`<option class="pick_option" value="${clientId}">${clients[clientId].username}</option>`
      }
    }

    function handleSubmit (evt) {
      const formData = new FormData(evt.target)
      const player1 = formData.get('player1')
      const player2 = formData.get('player2')

      evt.preventDefault()

      if (!player1 || !player2) {
        return
      }

      onPlayersPicked({
        1: player1,
        2: player2
      })
    }
  }

  function getCreationModal () {
    const buttonHTML = buttonView({
      label: 'submit'
    })

    return modalView(html`
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

  function getWinModal () {
    if (!currentGame || !currentGame.teams) {
      return html`<div></div>`
    }

    const prefix = sf`
      :host {
        color: #404040;
        height: 100%;
        width: 30em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: url('assets/img/celebration.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      
      :host > .logo {
        width: 100%;
        height: 150px;
        background-image: url('assets/icons/robotopia.svg');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        margin-bottom: 0;
      }
      
      :host > .win {
        width: 100%;
        font-size: 45px;
        overflow: hidden;
        text-align: center;
        font-weight: 600;
      }
      
      :host .result_container {
        width: 100%;
        overflow: hidden;
        margin-bottom: 20px;
      }
      
      :host .result_table {
        width: 80%;
        margin: 0 auto;
      }
      
      :host .result_table tr{
        height: 2em;
      }
      
      :host .result_table td{
        text-align: center;
        vertical-align: middle;
      }
      
    `

    const teams = currentGame.teams
    const results = []
    let i
    for (i in presenter.playerNumbers) {
      const playerId = presenter.playerNumbers[i]
      const client = presenter.clients[playerId]
      const points = teams[i].points
      const resources = teams[i].resources
      const username = client.username
      results.push({
        id: playerId,
        name: username,
        points: points,
        resources: resources
      })
    }

    results.sort((a, b) => {
      return a.resources < b.resources
    })

    const buttonHTML = buttonView({
      label: 'Close',
      onClick: onCloseWinModal
    })

    return modalView(html`
      <div class="${prefix}">
        <div class="logo"></div>
        <div class="win">${results[0].name} won!</div>
        <div class="result_container">${getTableFromResult(results)}</div>
        <div>${buttonHTML}</div>
      </div>
    `)

    function getTableFromResult (result) {
      return html`
      <table class="result_table">
        <tr><th>Player</th><th>Score</th></tr>
        ${result.map((res) => { return html`<tr><td>${res.name}</td><td>${res.resources}</td></tr>` })}
      </table>`
    }
  }
}
