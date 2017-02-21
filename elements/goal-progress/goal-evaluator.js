const _ = require('lodash')
// const X2Js = require('x2js')
const { getEntity } = require('@robotopia/choo-game')

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
      if (game && game.entities) {
        return game.entities.ROBOT.collector.hasResource === goal.params.hasResource
      }
      return false

    case 'collectResources':
      if (game && game.teams) {
        return game.teams[game.entities.ROBOT.team.id].resources === goal.params.amount
      }
      return false

    case 'dontTouchTileType':
      // TODO: check for robot touching dirt upon walking
      // goal.params.tileID
      return false

    case 'useBlockWithinBlock':
      // TODO: workspace to json, check for outer block. Stringify outer blocks statement object and regex the inner block.
      // const workspaceAsJSON = new X2Js().xml_str2json(workspace);
      // goal.params.outerBlock
      // goal.params.innerBlock
      // console.log(workspaceAsJSON)
      return false

    case 'discoverEntityOfType':
      if (!game || !game.entities || game.entities.length === 0) return false
      let i
      for (i in game.entities) {
        if (game.entities[i].hasOwnProperty('discoverable')) {
          let discoverable = game.entities[i].discoverable
          if (discoverable.type === goal.params.type && discoverable.discovererTeamIds && discoverable.discovererTeamIds['1']) return true
        }
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
