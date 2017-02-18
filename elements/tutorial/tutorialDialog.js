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
  
  :host > .story-hint {
    width: 100%;
    color: #8a6d3b;
    border: 1px solid #faebcc;
    padding: 15px;
    border-radius: 3px;
    padding-left: 50px;
    display: inline-block;
    background-color: #fcf8e3;
    background-image: url('assets/icons/info.svg');
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
      const nextLevelButtonHtml = getNextLevelButton(send, level)

      return modalView(html`
        <div class="${prefix} animated content">
          <h1>Congratulations, you finished the level!</h1>  
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
          ${nextLevelButtonHtml}
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
          
          ${story.img ? html`<img class="img" src="${story.img}"/>` : html``}
          
         ${hintHtml}
          
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
