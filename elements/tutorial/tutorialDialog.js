const _ = require('lodash')
const levels = require('../models/game/levels')
const { getGameState } = require('../../lib/game/index')
const { getGoals, checkMandatoryGoals } = require('goal')
const { storyModal, winModal } = require('modals')

const winningCondition = (gameState, level, workspace, send) => {
  const game = getGameState(gameState)
  const levelAmount = _.size(levels) - 1
  const story = level.storyModal

  const mandatoryGoals = getGoals({ game, workspace }, level.goals, { mandatory: true })
  const optionalGoals = getGoals({ game, workspace }, level.goals, { mandatory: false })

  if (checkMandatoryGoals({ game, workspace }, level.goals)) {
    const nextLevelButton = getNextLevelButton(send, level, levelAmount)

    // TODO move this to another place
    // we shouldn't call send here because
    // rerendering a component shouldn't have a side effect
    send('stopSimulation')

    return winModal({
      header: `Congratulations on finishing Level ${level.level}`,
      mandatoryGoals: mandatoryGoals,
      optionalGoals: optionalGoals,
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
      mandatoryGoals: mandatoryGoals,
      optionalGoals: optionalGoals,
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
