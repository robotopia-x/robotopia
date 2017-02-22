const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')

const IDLING_ROBOT_CODE = `
robot.onMode('red', function (marker) {
  while (true) {
    robot.moveTo(marker.position.x, marker.position.y)
    robot.collectResource()
    robot.moveTo(robot.getBasePosition().x, robot.getBasePosition().y)
    robot.depositResource()
  }
})
while (true) {
  robot.move("FORWARD")
  robot.rotate("LEFT")
}
`

const RESOURCES_TO_WIN = 100

module.exports = () => {

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

      entities: [
        entities.tutorialRobot({x: 12, y: 12, id: 'ROBOT', orientation: ORIENTATION.BACK, teamId: 1, discoverRange: 2}),
        entities.tutorialRobot({x: 21, y: 5, id: 'LOST_ROBOT01', orientation: ORIENTATION.FRONT, teamId: 1, discoverRange: 0, teamSprite: 2}),
        entities.tutorialRobot({x: 18, y: 22, id: 'LOST_ROBOT02', orientation: ORIENTATION.BACK, teamId: 1, discoverRange: 0, teamSprite: 2}),
        entities.tutorialRobot({x: 4, y: 14, id: 'LOST_ROBOT03', orientation: ORIENTATION.BACK, teamId: 1, discoverRange: 0, teamSprite: 2}),
        entities.tutorialBase({ x: 12, y: 12, id: 'BASE', teamId: 1 })
      ],

      teams: {
        1: { resources: 0, points: 0 }
      }
    },

    otherRobots: [
      {id: 'LOST_ROBOT01', groupId: 1, overwriteCode: IDLING_ROBOT_CODE},
      {id: 'LOST_ROBOT02', groupId: 1, overwriteCode: IDLING_ROBOT_CODE},
      {id: 'LOST_ROBOT03', groupId: 1, overwriteCode: IDLING_ROBOT_CODE}
    ],

    resources: { numberOfSpots: 10, value: 100, chunks: 10, color: 'BLUE' },
    
    editor: {
      workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="start_handler" x="50" y="50" deletable="false"></block>
    <block type="resource_event_handler" x="50" y="200" deletable="false"></block>
    <block type="marker_event_handler" x="50" y="350" deletable="false" editable="false">
      <field name="type">red</field>
      <data>EVENT_HANDLER</data>
      <statement name="body">
      <block type="move_to_entity" deletable="false" editable="false" movable="false">
        <field name="entity">marker.position</field>
        <next>
          <block type="collect_resource" deletable="false" editable="false" movable="false">
            <next>
              <block type="move_to_entity" deletable="false" editable="false" movable="false">
              <field name="entity">robot.getBasePosition()</field>
                <next>
                    <block type="deposit_resource" deletable="false" editable="false" movable="false"></block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
</statement>
</block>
</xml>`,

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
                    <block type="place_marker"></block>
                </category>
                
              </xml>`
    },

    label: 'Marker',

    goals: [
      {
        type: 'collectResources',
        params: {amount: RESOURCES_TO_WIN},
        desc: 'Collect ' + RESOURCES_TO_WIN + ' resources',
        isMandatory: true
      }
    ],

    storyModal: {
      text: `Now that we've got 3 more robots, let's get down to business. Utilize them to gather some resources.`,
      hint: 'Place a marker next to a resource.'
    },

    winModal: {
      text: `Now that's what I'm talking about. ${RESOURCES_TO_WIN} blue gems. So shiny!`,
      unlockedBlock: {
        name: 'Block',
        img: ''
      }
    }
  }
}
