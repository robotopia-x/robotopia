const _ = require('lodash')
const html = require('choo/html')
const modalView = require('./modal')
const buttonView = require('./button')

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

  function getPlayerPickingModal() {
    const startButton = buttonView({
      label: 'Start'
    })

    const cancelButton = buttonView({
      label: 'Cancel',
      onClick: onCancelPlayerPicking
    })

    return modalView(html`
      <div>
        <p>Chose the players to battle.</p>
        <form onsubmit=${handleSubmit}>
        ${clientsToOptions("1", presenter.clients, presenter.playerNumbers)}
        ${clientsToOptions("2", presenter.clients, presenter.playerNumbers)}
        ${startButton}
        </form>
        ${cancelButton}
      </div>
    `)


    function clientsToOptions (selectSuffix, clients, players) {
      return html`
        <select name="player${selectSuffix}">
          ${Object.keys(clients).map(clientToOption)}
        </select>
      `

      function clientToOption (clientId) {
        //let isSelected = players[selectSuffix] === clientId
        return html`<option value="${clientId}">${clients[clientId].username}</option>`
      }

    }

    function handleSubmit (evt) {
      const formData = new FormData(evt.target)
      const player1 = formData.get('player1')
      const player2 = formData.get('player2')

      evt.preventDefault()

      onPlayersPicked({
        1: player1,
        2: player2
      })
    }

  }
  
  function getCreationModal() {
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
  
  function getWinModal() {
    if (!currentGame || !currentGame.teams) {
      return html`<div></div>`
    }
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

    const winner = results[0]

    console.log(results)

    const buttonHTML = buttonView({
      label: 'Close',
      onClick: onCloseWinModal
    })

    return modalView(html`
      <div>
        <h1>Congratulations ${results[0].name}! You won!</h1>
        <p> won the game scoring ${results[0].resources} points</p>
        ${buttonHTML}
      </div>
    `)

    function getWinnerFromResults(results) {
      let i, highest
      const keys = Object.keys(results)
      if (keys.length === 0) {
        return
      }
      highest = results[keys[0]]
      for (i = 1; i < keys.length; i++) {
        let current = results[keys[i]]
        if (current.points > highest.points) {
          highest = current
        }
      }
      return highest.id
    }

    function resultAsTable(result) {

    }

  }

}
