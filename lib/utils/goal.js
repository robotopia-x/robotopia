const html = require('choo/html')
const _ = require('lodash')
const { getEntity } = require('./game')

function getGoals (game, goals) {
  return _.map(goals, (goal) => html`<p>${checkGoal(goal.type, game, goal.params)} ${goal.desc}</p>`)
}

function checkGoal (type, game, params) {
  if (type === 'moveTo') {
    const entity = getEntity(params.entity, game)
    const entityPos = { x: entity.position.x, y: entity.position.y }

    return _.isEqual(entityPos, params.position)
  }

  if (type === 'collectResource') {
    return true
  }
}

function checkAllGoals (game, goals) {
  return _.every(goals, (goal) => checkGoal(goal.type, game, goal.params))
}

module.exports = {
  getGoals,
  checkGoal,
  checkAllGoals
}
