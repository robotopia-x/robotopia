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

    case 'maxBlocks':
      const workspaceMatch = workspace.match(/<block/g)

      if (workspaceMatch) {
        return workspaceMatch.length <= goal.params.amount
      }
      return false

    default:
      return false
  }
}

function checkMandatoryGoals ({ game, workspace }, goals) {
  return _(goals)
    .filter('mandatory')
    .every((goal) => checkGoal(goal.type, { game, workspace }, goal.params))
}

module.exports = {
  checkGoal,
  checkMandatoryGoals
}
