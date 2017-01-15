const html = require('choo/html')
const sf = require('sheetify')
const { getGameState } = require('../lib/game')
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
    padding: 0px 25px 25px 25px;
  }
  
  :host h5, h6 {
    margin: 0;
  }
  
  :host > .goals {
  }
`

const goalProgress = (gameState, level, workspace) => {
  const game = getGameState(gameState)

  const mandatoryGoals = getGoals({ game, workspace }, level.goals, { mandatory: true })
  const optionalGoals = getGoals({ game, workspace }, level.goals, { mandatory: false })

  if (!level.displayStory) {
    return html`
      <div class="${goalPrefix}">
        <h4>Level: ${level.level}</h4>
        <div class="goals">
          <div>
            <h5>Goals: </h5>
            ${mandatoryGoals}
          </div>
          <div>
            <h6>Optional: </h6>
            ${optionalGoals}
          </div>
        </div>
      </div>
    `
  }
}

module.exports = goalProgress
