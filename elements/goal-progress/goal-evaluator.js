const _ = require('lodash')
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
      if (game && haventTouchedTile) {
        const robotPosition = game.entities.ROBOT.position
        const currTile = game.tiles[robotPosition.y][robotPosition.x]

        haventTouchedTile = goal.params.tileID !== currTile
      }

      if (!game) {
        haventTouchedTile = true
      }

      return haventTouchedTile

    case 'touchTile':
      if (game) {
        const robotPosition = game.entities.ROBOT.position
        const currTile = game.tiles[robotPosition.y][robotPosition.x]

        return goal.params.tileID === currTile
      }
      return false

    case 'useBlockWithinBlock':
      const outerBlockType = goal.params.outerBlock
      const innerBlockType = goal.params.innerBlock

      // Regex for blocks - no need to destructure JSON
      return workspace.match(`<block type="${outerBlockType}".*<statement.*<block type="${innerBlockType}"`, 'g')

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
