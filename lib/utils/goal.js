const html = require('choo/html')
const _ = require('lodash')
const { getEntity } = require('../game')

function getGoals ({ game, workspace }, goals, { mandatory }) {
  const filteredGoals = _.filter(goals, { mandatory: mandatory })
  return _.map(filteredGoals, (goal) => html`
        <p>${checkGoal(goal.type, { game, workspace }, goal.params)} ${goal.desc}</p>`)

}

function checkGoal (type, { game, workspace }, params) {
  if (type === 'moveTo') {
    const entity = getEntity(params.entity, game)
    const entityPos = { x: entity.position.x, y: entity.position.y }

    return _.isEqual(entityPos, params.position)
  }

  if (type === 'useBlock') {
    return workspace.search(params.type) > -1
  }

  if (type === 'maxBlocks') {
    const workspaceMatch = workspace.match(/<block/g)

    if (workspaceMatch) {
      return workspaceMatch.length <= params.amount
    }
    return false
  }

  return false
}

function checkMandatoryGoals ({ game, workspace }, goals) {
  return _(goals)
    .filter('mandatory')
    .every((goal) => checkGoal(goal.type, { game, workspace }, goal.params))
}

module.exports = {
  getGoals,
  checkGoal,
  checkMandatoryGoals
}
