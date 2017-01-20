const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')
const { getTeamGamePoints, getTeamResources } = require('../lib/game')

const gameStatsPrefix = sf`
  :host {
    position: absolute;
    right: 0;
    top: 50px;
    background-color: #DDDDDD;
    color: #404040;
    padding: 25px;
    border-width: 0px 0px 10px 10px;
    border-style: solid;
    border-color: #404040;
  }
  
  :host > h2 {
    font-size: 1.2em;
    margin: 0;
  }
  
  :host > table {
    margin-top: 10px;
    border-spacing: 25px 5px;
    text-align: center;
  }
  
  :host > table > th {
    text-align: center;
  }
`

function gamePointsDisplay ({
  gamePoints, resources
}) {
  const gamePointsHtml = _.map(gamePoints, (gamePoint, id) => {
    return html`
      <tr><td>${id}</td><td>${getTeamGamePoints({ gamePoints }, id)}</td><td>${getTeamResources(resources, id)}</td></tr>
    `
  })

  return html`
    <div class="${gameStatsPrefix}">
      <h2>Game Stats</h2>
      <table>
        <tr><th>Team</th><th>Game Points</th><th>Resources</th></tr>
        ${gamePointsHtml}
      </table>
    </div>
  `
}

module.exports = gamePointsDisplay
