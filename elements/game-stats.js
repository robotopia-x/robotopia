const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const { interpolate } = require('../lib/game')

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
  game, progress
}) {
  if (!game) {
    return null
  }
  const gameTeamStatsHtml = _(game.current.teams)
    .keys()
    .map((teamId) => {
      const currentTeam = game.current.teams[teamId]
      const prevTeam = game.prev === null ? currentTeam : game.prev.teams[teamId]
      const points = Math.round(interpolate(currentTeam.points, prevTeam.points, progress))
      const resources = Math.round(interpolate(currentTeam.resources, prevTeam.resources, progress))

      return html`
        <tr>
          <td>${teamId}</td>
          <td>${points}</td>
          <td>${resources}</td>
        </tr>
      `
    })
    .value()

  return html`
    <div class="${gameStatsPrefix}">
      <h2>Game Stats</h2>
      <table>
        <tr><th>Team</th><th>Game Points</th><th>Resources</th></tr>
        ${gameTeamStatsHtml}
      </table>
    </div>
  `
}

module.exports = gamePointsDisplay
