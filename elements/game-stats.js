const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const { interpolate } = require('../lib/game')

const gameStatsPrefix = sf`
  :host {
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(221,221,221,0.85);
    color: #404040;
    padding: 10px;
    border-radius: 3px;
    margin: 20px;
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
  let teamColumnHeaderHtml

  const gameTeamStatsHtml = _(game.current.teams)
    .keys()
    .map((teamId) => {
      let teamFieldHtml
      const currentTeam = game.current.teams[teamId]
      const prevTeam = game.prev === null ? currentTeam : game.prev.teams[teamId]
      // TODO: Uncomment when points are implemented
      // const points = Math.round(interpolate(currentTeam.points, prevTeam.points, progress))
      const resources = Math.round(interpolate(currentTeam.resources, prevTeam.resources, progress))

      if (_.size(game.current.teams) > 1) {
        teamFieldHtml = html`<td>${teamId}</td>`
      }

      return html`
        <tr>
          ${teamFieldHtml}
          <td>${resources}</td>
        </tr>
      `
    })
    .value()

  if (_.size(game.current.teams) > 1) {
    teamColumnHeaderHtml = html`<th>Team</th>`
  }

  return html`
    <div class="${gameStatsPrefix}">
      <table>
        <tr>${teamColumnHeaderHtml}<th>Resources</th></tr>
        ${gameTeamStatsHtml}
      </table>
    </div>
  `
}

module.exports = gamePointsDisplay
