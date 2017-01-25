const html = require('choo/html')
const _ = require('lodash')
const { getGameState } = require('../../lib/game/index')
const { checkGoals } = require('../goal-progress/goal-evaluator')
const buttonView = require('../button')
const modalView = require('../modal')
const { goalListView } = require('../goal-progress')

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
        <div class="content animated">
          <h1>Tutorial level: ${level.label}</h1> 
          <div class="storyTime">
            <p>${story.text}</p>
            <p>(Hint: ${story.hint})</p>
          </div>
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
