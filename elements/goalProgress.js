const html = require('choo/html')
const sf = require('sheetify')
const { getGameState } = require('../lib/utils/game')
const { getGoals } = require('../lib/utils/goal')

const goalPrefix = sf`
  :host {
    position: absolute;
    left: 80%;
    top: 0;
    height: 20%;
    width: 20%;
    background-color: #DDDDDD;
    color: #404040;
    overflow: scroll;
    padding: 25px;
  }
  
  :host > .goals {
  }
`

const goalProgress = (gameState, level) => {
  const game = getGameState(gameState)

  if (!level.displayStory) {
    return html`
      <div class="${goalPrefix}">
        <h4>Level: ${level.level}</h4>
        <div class="goals">
          <h3>Goals: </h3>
          ${getGoals(game, level.goals)}
        </div>
      </div>
    `
  }
}

module.exports = goalProgress
