const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    min-width: 200px;
  }
  
  :host li {
    font-weight: 600;
    font-size: 150%;
  }
  
  :host .player {
    color: green;
  }
`

function clientsList ({ clients, playerNumbers }) {
  return html`
    <div class="${prefix}">
      <h1>Clients</h1>
      <ul>
        ${Object.keys(clients).map(clientToLi)}
      </ul>
    </div>
  `

  function clientToLi (key) {
    const isPlayer = _.valuesIn(playerNumbers).indexOf(key) >= 0

    return html`
      <li class="${isPlayer ? 'player' : ''}">${clients[key].username}</li>
    `
  }
}

module.exports = clientsList
