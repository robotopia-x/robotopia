const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const { getGameState } = require('@robotopia/choo-game')
const { checkGoals } = require('../goal-progress/goal-evaluator')
const buttonView = require('../button')
const modalView = require('../modal')
const { goalListView } = require('../goal-progress')

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
  
  :host > .unlocked {
    width: 100%;
    text-align: center;
  }
  
  :host > .unlocked > .unlockedBlock {
    border: 5px solid #DDDDDD;
    border-radius: 20px;
    width: 50%;
  }
  
  :host > .levelButtons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`

const winningCondition = (gameState, { level, isStoryModalOpen }, workspace, clock, send) => {
  if (level) {
    const game = getGameState(gameState)
    const story = level.storyModal

    const [mandatoryGoals, optionalGoals] = _.partition(level.goals, (goal) => goal.isMandatory)

    if (checkGoals({ game, workspace }, mandatoryGoals)) {
      const repeatLevelButtonHtml = buttonView({
        label: 'Restart Level',
        onClick: () => console.log('reload the page')
      })
      const nextLevelButtonHtml = getNextLevelButton(send, level)
      let unlockedHtml

      if (story.unlockedBlock) {
        unlockedHtml = html`
            <div class="unlocked">
              <h3>You just unlocked the ${story.unlockedBlock.name}-Block!</h3>
              <img class="unlockedBlock" src="${story.unlockedBlock.img}"}>
            </div>
          `
      }

      if (level.onFinish) level.onFinish({ gameState, workspace} )

      send('clock:stop')

      return modalView(html`
        <div class="${prefix} animated content">
          <h1>Congratulations, you finished the level!</h1>
          ${unlockedHtml}
          <div class="goals">
            <div>
              <h5>Goals: </h5>
              ${goalListView({ goals: mandatoryGoals, game, workspace })}
            </div>
            <div style="${optionalGoals.length === 0 ? 'display: none' : ''}">
              <h5>Optional: </h5>
              ${goalListView({ goals: optionalGoals, game, workspace })}
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
      let hintHtml

      const startButton = buttonView({
        label: 'Start Tutorial',
        onClick: () => send('tutorial:setDisplayStoryModal', { displayStory: false })
      })

      if (story.hint) {
        hintHtml = html`
          <p class="story-hint">
            ${story.hint}
          </p>
        `
      }

      return modalView(html`
        <div class="${prefix} content animated">
          <h1>${level.label}</h1> 
          
          <p class="story-text">
            ${story.text}            
          </p>
          
          <div class="goals">
            <div>
              <h5>Goals: </h5>
              ${goalListView({ goals: mandatoryGoals, game, workspace })}
            </div>
            <div style="${optionalGoals.length === 0 ? 'display: none' : ''}">
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
    return buttonView({
      label: 'Next Level',
      onClick: () => send('location:set', `#tutorial/${level.nextTutorial}`)
    })
  }

  return buttonView({
    label: 'Load Editor',
    onClick: () => send('location:set', '#editor')
  })
}

module.exports = winningCondition
