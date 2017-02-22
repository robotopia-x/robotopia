/* globals FormData */

const html = require('choo/html')
const modalView = require('./modal')
const buttonView = require('./button')

module.exports = function ({
  presenter,
  onJoinGroup,
  onPlayersPicked
}) {

  if (!presenter.groupId) {
    return getCreationModal()
  }

  if (presenter.displayPlayerPickScreen) {
    return getPlayerPickingModal()
  }

  return html`<div></div>`

  function getPlayerPickingModal() {
    const buttonHTML = buttonView({
      label: 'Start'
    })

    return modalView(html`
      <div>
        <p>Chose the players to battle.</p>
        <form onsubmit=${handleSubmit}>
        ${clientsToOptions("1", presenter.clients, presenter.playerNumbers)}
        ${clientsToOptions("2", presenter.clients, presenter.playerNumbers)}
        ${buttonHTML}
        </form>
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

}
