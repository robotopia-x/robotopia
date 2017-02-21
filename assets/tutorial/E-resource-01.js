/* globals localStorage */
const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')

const DEFAULT_WORKSPACE = `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="start_handler" x="50" y="50" deletable="false"></block><block type="resource_event_handler" x="400" y="400" deletable="false"></block></xml>`
const DEFAULT_ENTITIES = [
  entities.tutorialRobot({x: 12, y: 12, id: 'ROBOT', orientation: ORIENTATION.BACK, teamId: 1, discoverRange: 2}),
  entities.tutorialBase({ x: 12, y: 12, id: 'BASE', teamId: 1 })
]
const LOCAL_STORAGE_LOAD = 'robot04'

module.exports = () => {
  let localStorageFromPreviousLevel = localStorage[LOCAL_STORAGE_LOAD]
  let previousWorkspace, previousEntities
  if (localStorageFromPreviousLevel) {
    try {
      let previousState = JSON.parse(localStorageFromPreviousLevel)
      if (previousState) {
        previousWorkspace = previousState.workspace
        try {
          let jsonEntities = JSON.parse(previousState.entities)
          let i
          previousEntities = []
          for (i in jsonEntities) {
            let toAdd = jsonEntities[i]
            toAdd.id = i
            if (toAdd.hasOwnProperty('discoverable')) toAdd.discoverable.discovererTeamIds = {}
            previousEntities.push(toAdd)
          }
        } catch (e) {
          console.log('Error parsing entities from previous Level: ' + e)
        }
      }
    } catch (e) {
      console.log('Error parsing from previous Level: ' + e)
    }
  }

  return {
    game: {
      tiles: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 3, 2, 3, 3, 1],
        [1, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 1, 1, 1, 1, 3, 3, 3, 2, 2, 2, 3, 3, 1],
        [1, 3, 3, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 2, 2, 3, 3, 3, 1],
        [1, 3, 3, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1],
        [1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1],
        [1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 1, 1, 1],
        [1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
        [1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 4, 5, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [1, 1, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1],
        [1, 1, 1, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1],
        [1, 1, 1, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 1],
        [1, 1, 1, 1, 3, 3, 3, 3, 2, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 1],
        [1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 2, 2, 2, 2, 3, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 2, 3, 2, 3, 1],
        [1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],

      entities: getEntitiesOrNew(),

      teams: {
        1: { resources: 0, points: 0 }
      }
    },

    resources: previousEntities ? null : { numberOfSpots: 10, value: 100, chunks: 10, color: 'BLUE' },

    editor: {
      workspace: getWorkspace(),

      toolbox: `<xml id="toolbox" style="display: none">

                <category name="Logic" colour="210">
                    <block type="controls_repeat"></block>
                    <block type="controls_if"></block>
                    <block type="logic_compare"></block>
                </category>
                
                <sep gap="8"></sep>
                
                <category name="Numbers" colour="230">
                    <block type="math_number"></block>
                    <block type="random_number"></block>
                </category>
                
                <sep gap="8"></sep>
                
                <category name="Movement" colour="40">
                    <block type="move"></block>
                    <block type="rotate"></block>
                    <block type="move_to_entity"></block>
                </category>
                
                <sep gap="8"></sep>
                
                <category name="Actions" colour="50">
                    <block type="collect_resource"></block>
                    <block type="deposit_resource"></block>
                </category>
                
              </xml>`
    },

    label: 'Scout',

    goals: [
      {
        type: 'collectResources',
        params: {amount: 10},
        desc: 'Collect the resource and bring it back to the base',
        isMandatory: true
      }
    ],

    storyModal: {
      text: '',
      hint: '',
      img: 'assets/img/tutorials/simple-move.png'
    }
  }

  function getWorkspace () {
    if (previousWorkspace) {
      let injectPart = '<block type="resource_event_handler" x="400" y="400" deletable="false">'
      let injectBefore = '</xml>'
      let newWS = previousWorkspace.slice(0, previousWorkspace.length - injectBefore.length)
      newWS += injectPart
      newWS += injectBefore
      return newWS
    }
    return DEFAULT_WORKSPACE
  }

  function getEntitiesOrNew () {
    if (previousEntities && previousEntities.length > 0) return previousEntities
    return DEFAULT_ENTITIES
  }
}
