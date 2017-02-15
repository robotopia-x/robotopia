const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    min-width: 200px;
  }
`

function clientsList ({ clients, playerNumbers }) {
  return html`
    <div class="${prefix}">
      <h3>Clients</h3>
      <ul>
        ${Object.keys(clients).map(clientToLi)}
      </ul>
    </div>
  `

  function clientToLi (key) {
    const isPlayer = _.valuesIn(playerNumbers).indexOf(key) >= 0

    return html`
      <li>${clients[key].username} ${isPlayer ? 'p' : ''}</li>
    `
  }
}

module.exports = clientsList
