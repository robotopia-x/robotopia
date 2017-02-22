const _ = require('lodash')
// const X2Js = require('x2js')
const { getEntity } = require('@robotopia/choo-game')
let haventTouchedTile = true

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
      const workspaceMatch = workspace.match(/<block type="\S*"/g)
      const matchAsString = workspaceMatch.toString()
      const handlerMatch = matchAsString.match(/_handler/g)

      if (workspaceMatch) {
        if (handlerMatch) {
          return (workspaceMatch.length - handlerMatch.length) <= goal.params.amount
        }
        return workspaceMatch.length <= goal.params.amount
      }
      return false

    case 'carryResource':
      if (game && game.entities && game.entities.ROBOT && game.entities.ROBOT.collector) {
        return game.entities.ROBOT.collector.hasResource === goal.params.hasResource
      }
      return false

    case 'collectResources':
      if (game && game.teams) {
        return game.teams[game.entities.ROBOT.team.id].resources === goal.params.amount
      }
      return false

    case 'dontTouchTileType':
      if (game && haventTouchedTile) {
        const robotPosition = game.entities.ROBOT.position
        const currTile = game.tiles[robotPosition.y][robotPosition.x]

        haventTouchedTile = goal.params.tileID !== currTile
      }

      if (!game) {
        haventTouchedTile = true
      }

      return haventTouchedTile

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
