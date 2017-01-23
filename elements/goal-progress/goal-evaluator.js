const _ = require('lodash')
const { getEntity } = require('../../lib/game/index')

function checkGoal ({ goal, game, workspace }) {
  switch (goal.type) {
    case 'moveTo':
      if (game === null) {
        return false
      }

      const entity = getEntity(goal.params.entity, game)
      const entityPos = { x: entity.position.x, y: entity.position.y }

      return _.isEqual(entityPos, goal.params.position)

    case 'useBlock':
      return workspace.indexOf(goal.params.type) > -1

    case 'doNotUseBlock':
      return workspace.indexOf(goal.params.type) === -1

    case 'maxBlocks':
      const workspaceMatch = workspace.match(/<block/g)

      if (workspaceMatch) {
        return workspaceMatch.length <= goal.params.amount
      }
      return false

    case 'carryResource':
      console.log(workspace)
      if (game) {
        return game.entities.ROBOT.collector.hasResource === goal.params.hasResource
      }
      return false

    default:
      return false
  }
}

function checkGoals ({ game, workspace }, goals) {
  return _.every(goals, (goal) => checkGoal({ goal, game, workspace }))
}

module.exports = {
  checkGoal,
  checkGoals
}
