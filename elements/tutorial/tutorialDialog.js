const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const { getGameState } = require('@robotopia/choo-game')
const { checkGoals } = require('../goal-progress/goal-evaluator')
const buttonView = require('../button')
const modalView = require('../modal')
const { goalListView } = require('../goal-progress')
const { i18nText } = require('../i18n')

const prefix = sf`
  :host {
    min-width: 700px;
  }

  :host > .story-text {
    height: 80px;
    background: #dedede;
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
    background: url('assets/img/rick-avatar.png');
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
     border-right: 26px solid #dedede;
     border-bottom: 13px solid transparent;
  }
  
  :host > h1 {
    color: #03a9f4;
  }
  
  :host > .unlocked {
    width: 100%;
    text-align: center;
  }
  
  :host > .unlocked > .unlockedBlock {
    border: 5px solid #DDDDDD;
    border-radius: 20px;
    max-height: 250px;
  }
  
  :host > .levelButtons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`

const winningCondition = (gameState, { level, isStoryModalOpen }, workspace, send) => {
  if (level) {
    const game = getGameState(gameState)
    const [mandatoryGoals, optionalGoals] = _.partition(level.goals, (goal) => goal.isMandatory)

    if (checkGoals({ game, workspace }, mandatoryGoals)) {
      const winModal = level.winModal

      const repeatLevelButtonHtml = buttonView({
        label: 'Restart Level',
        onClick: () => {
          send('game:loadGameState', { loadState: level.game })
        }
      })
      const nextLevelButtonHtml = getNextLevelButton(send, level)
      let unlockedHtml

      if (winModal.unlockedBlock) {
        unlockedHtml = html`
            <div class='unlocked'>
              <h3>You just unlocked the ${winModal.unlockedBlock.name}-Block!</h3>
              <img class='unlockedBlock' src='${winModal.unlockedBlock.img}EXTERNAL_FRAGMENT'>
            </div>
          `
      }

      if (level.onFinish) level.onFinish({ gameState, workspace })

      send('tutorial:sendEvent', { type: 'levelWon' })

      return modalView(html`
        <div class="${prefix} animated content">
          <h1>Congratulations, you finished the level!</h1>
          ${unlockedHtml}
          <p>${winModal.text}</p>
          <div class="goals">
            <div>
              <h5>Goals: </h5>
              ${goalListView({ goals: mandatoryGoals, game, workspace, levelId: level.id })}
            </div>
            <div style="${optionalGoals.length === 0 ? 'display: none' : ''}">
              <h5>Optional: </h5>
              ${goalListView({ goals: optionalGoals, game, workspace, levelId: level.id })}
            </div>
          </div>
          <br>
          <div class="levelButtons">
            ${repeatLevelButtonHtml}
            ${nextLevelButtonHtml}
          </div>
        </div>
      `)
    }

    if (isStoryModalOpen) {
      const startButton = buttonView({
        label: 'Start Tutorial',
        onClick: () => send('tutorial:setDisplayStoryModal', { displayStory: false })
      })

      return modalView(html`
        <div class="${prefix} content animated">
          <h1>${level.label}</h1> 
          
          <p class="story-text">
            ${i18nText('levels', level.id, 'storyModal.text')}            
          </p>
          
          <div class="goals">
            <div>
              <h5>Goals: </h5>
              ${goalListView({ goals: mandatoryGoals, game, workspace, levelId: level.id })}
            </div>
            <div style="${optionalGoals.length === 0 ? 'display: none' : ''}">
              <h5>Optional: </h5>
              ${goalListView({ goals: optionalGoals, game, workspace, levelId: level.id })}
            </div>
          </div>
          ${startButton}
        </div>      
      `)
    }
  }
}

function getNextLevelButton (send, level) {
  return buttonView({
    label: 'Next',
    onClick: () => send('tutorial:nextLevel', (nextLocation) => {
      send('location:set', nextLocation)
    })
  })
}

module.exports = winningCondition
