const _ = require('lodash')
const levels = require('../models/game/levels')
const { getGameState } = require('../lib/utils/game')
const { getGoals, checkAllGoals } = require('../lib/utils/goal')
const { storyModal, winModal } = require('../elements/modals')

const winningCondition = (gameState, level, send) => {
  const game = getGameState(gameState)
  const levelAmount = _.size(levels) - 1
  const story = level.storyModal
  const goals = getGoals(game, level.goals)

  if (checkAllGoals(game, level.goals)) {
    const nextLevelButton = getNextLevelButton(send, level, levelAmount)

    // TODO move this to another place
    // we shouldn't call send here because
    // rerendering a component shouldn't have a side effect
    send('stopSimulation')

    return winModal({
      header: `Congratulations on finishing Level ${level.level}`,
      goals: goals,
      buttonText: nextLevelButton.text,
      onClick: nextLevelButton.callback
    })
  }

  if (level.displayStory) {
    return storyModal({
      header: `Tutorial - Level ${level.level}`,
      story: story.text,
      hint: story.hint,
      img: story.img,
      goals: goals,
      buttonText: 'Start Tutorial',
      onClick: () => send('level:_setDisplayStoryModal', { displayStory: false })
    })
  }
}

function getNextLevelButton (send, level, levelAmount) {
  if (level.level < levelAmount) {
    return {
      text: 'Next Level',
      callback: () => send('nextLevel')
    }
  }

  return {
    text: 'Load Editor',
    callback: () => send('location:set', '/')
  }
}

module.exports = winningCondition
