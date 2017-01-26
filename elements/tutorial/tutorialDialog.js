const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const { getGameState } = require('../../lib/game/index')
const { checkGoals } = require('../goal-progress/goal-evaluator')
const buttonView = require('../button')
const modalView = require('../modal')
const { goalListView } = require('../goal-progress')

const introPrefix = sf`
  :host > .story-text {
    height: 80px;
    background: #fff;
    position: relative;
    border-radius: 10px;
    padding: 15px;
    margin: 50px 0 75px 125px;
  }
  
  :host > .story-text:before {
    content: '';
    width: 100px;
    height: 175px;
    position: absolute;
    top: -50px;
    left: -130px;
    background: url('../../assets/img/rick-avatar.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  :host > .story-text:after {
     content: '';
     position: absolute;
     right: 100%;
     top: 26px;
     width: 0;
     height: 0;
     border-top: 13px solid transparent;
     border-right: 26px solid #fff;
     border-bottom: 13px solid transparent;
  }
  
  :host > .story-hint {
    width: 100%;
    color: #8a6d3b;
    border: 1px solid #faebcc;
    padding: 15px;
    border-radius: 3px;
    padding-left: 50px;
    display: inline-block;
    background-color: #fcf8e3;
    background-image: url(../../assets/icons/info.svg);
    background-size: 32px 32px;
    background-position: 10px center;
    background-repeat: no-repeat;
  }
`

const winningCondition = (gameState, { level, isStoryModalOpen }, workspace, send) => {
  if (level) {
    const game = getGameState(gameState)
    const story = level.storyModal

    const [mandatoryGoals, optionalGoals] = _.partition(level.goals, (goal) => goal.isMandatory)

    if (checkGoals({ game, workspace }, mandatoryGoals)) {
      const nextLevelButtonInfo = getNextLevelButton(send, level)
      const nextLevelButton = buttonView({
        label: nextLevelButtonInfo.text,
        onClick: nextLevelButtonInfo.callback
      })

      return modalView(html`
        <div class="animated content">
          <h1>Congratulations on finishing level: ${level.label}</h1>  
          <div class="goals">
            <div>
              <h5>Goals: </h5>
              ${goalListView({ goals: mandatoryGoals, game, workspace })}
            </div>
            <div>
              <h6>Optional: </h6>
              ${goalListView({ goals: optionalGoals, game, workspace })}
            </div>
          </div>
          ${nextLevelButton}
        </div>
      `)
    }

    if (isStoryModalOpen) {
      const startButton = buttonView({
        label: 'Start Tutorial',
        onClick: () => send('tutorial:setDisplayStoryModal', { displayStory: false })
      })

      return modalView(html`
        <div class="${introPrefix} content animated">
          <h1>${level.label}</h1> 
          <p class="story-text">
            ${story.text}            
          </p>
          
          <p class="story-hint">
            ${story.hint}
          </p>
          
          ${story.img ? html`<img class="img" src="${story.img}"/>` : html``}
          <div class="goals">
            <div>
              <h5>Goals: </h5>
              ${goalListView({ goals: mandatoryGoals, game, workspace })}
            </div>
            <div>
              <h5>Optional: </h5>
              ${goalListView({ goals: optionalGoals, game, workspace })}
            </div>
          </div>
          ${startButton}
        </div>      
      `)
    }
  }
}

function getNextLevelButton (send, level) {
  if (level.nextTutorial) {
    return {
      text: 'Next Level',
      callback: () => send('location:set', `/tutorial/${level.nextTutorial}`)
    }
  }

  return {
    text: 'Load Editor',
    callback: () => send('location:set', '/editor')
  }
}

module.exports = winningCondition
