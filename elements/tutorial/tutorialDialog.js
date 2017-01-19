const _ = require('lodash')
const { getGameState } = require('../../lib/game/index')
const { checkGoals } = require('../goal-progress/goal-evaluator')
const { storyModal, winModal } = require('./modals')
const { goalListView } = require('../goal-progress')

const winningCondition = (gameState, { level, isStoryModalOpen }, workspace, send) => {
  if (level) {
    const game = getGameState(gameState)
    const story = level.storyModal

    const [mandatoryGoals, optionalGoals] = _.partition(level.goals, (goal) => goal.isMandatory)

    if (checkGoals({ game, workspace }, mandatoryGoals)) {
      const nextLevelButton = getNextLevelButton(send, level)

      return winModal({
        header: `Congratulations on finishing level: ${level.label}`,
        mandatoryGoals: goalListView({ goals: mandatoryGoals, game, workspace }),
        optionalGoals: goalListView({ goals: optionalGoals, game, workspace }),
        buttonText: nextLevelButton.text,
        onClick: nextLevelButton.callback
      })
    }

    if (isStoryModalOpen) {
      return storyModal({
        header: `Tutorial level: ${level.label}`,
        story: story.text,
        hint: story.hint,
        img: story.img,
        mandatoryGoals: goalListView({ goals: mandatoryGoals, game, workspace }),
        optionalGoals: goalListView({ goals: optionalGoals, game, workspace }),
        buttonText: 'Start Tutorial',
        onClick: () => send('tutorial:setDisplayStoryModal', { displayStory: false })
      })
    }
  }
}

function getNextLevelButton (send, level) {
  if (level.nextTutorial) {
    return {
      text: 'Next Level',
      callback: () => send('tutorial:loadLevel', { name: level.nextTutorial })
    }
  }

  return {
    text: 'Load Editor',
    callback: () => send('location:set', '/#editor')
  }
}

module.exports = winningCondition
