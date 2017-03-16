const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

const LOST_ROBOT_CODE = `
robot.onMode('red', function (marker) {
  robot.moveTo(robot.getBasePosition().x, robot.getBasePosition().y)
})
//while (true) {
//    robot.move("FORWARD")
//    robot.rotate("LEFT")
//  }
`

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
        entities.tutorialRobot({x: 8, y: 8, id: 'ROBOT', orientation: ORIENTATION.FRONT, teamId: 1, discoverRange: 2}),
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
      {id: 'LOST_ROBOT01', groupId: 1, overwriteCode: LOST_ROBOT_CODE},
      {id: 'LOST_ROBOT02', groupId: 1, overwriteCode: LOST_ROBOT_CODE},
      {id: 'LOST_ROBOT03', groupId: 1, overwriteCode: LOST_ROBOT_CODE}
    ],

    editor: {
      workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="start_handler" x="50" y="50" deletable="false"></block>
    <block type="marker_event_handler" x="50" y="400" deletable="false" editable="false">
      <field name="type">red</field>
      <data>EVENT_HANDLER</data>
      <statement name="body" editable="false">
        <block type="move_to_entity" movable="false" editable="false">
          <field name="entity">marker.position</field>
        </block>
      </statement>
</block>
</xml>`,

      toolbox: `<xml id="toolbox" style="display: none">

                <category name="Logic" colour="${blockColors.LOGIC_COLOR}">
                    <block type="controls_repeat"></block>
                    <block type="controls_if"></block>
                    <block type="logic_compare"></block>
                </category>
                
                <sep gap="8"></sep>
                
                <category name="Numbers" colour="${blockColors.MATH_COLOR}">
                    <block type="math_number"></block>
                    <block type="random_number"></block>
                </category>
                
                <sep gap="8"></sep>
                
                <category name="Movement" colour="${blockColors.MOVEMENT_COLOR}">
                    <block type="move"></block>
                    <block type="rotate"></block>
                    <block type="move_to_entity"></block>
                </category>
                
                <sep gap="8"></sep>
                
                <category name="Actions" colour="${blockColors.ACTION_COLOR}">
                    <block type="collect_resource"></block>
                    <block type="deposit_resource"></block>
                    <block type="place_marker"></block>
                </category>
                
              </xml>`
    },

    label: 'Marker - Help Them',

    goals: [
      {
        type: 'moveTo',
        params: {position: {x: 12, y: 12}, entity: 'LOST_ROBOT01'},
        desc: 'Lost robot is in time for lunch',
        isMandatory: true
      },
      {
        type: 'moveTo',
        params: {position: {x: 12, y: 12}, entity: 'LOST_ROBOT02'},
        desc: 'Lost robot is save',
        isMandatory: true
      },
      {
        type: 'moveTo',
        params: {position: {x: 12, y: 12}, entity: 'LOST_ROBOT03'},
        desc: 'Lost robot returned to home after 10 years',
        isMandatory: true
      }
    ],

    storyModal: {
      text: `Unfortunately three of the robots got lost. Luckily they will automatically move to a "red marker" as soon as one is placed.`,
      hint: 'Robots can place markers of a given color.'
    },

    winModal: {
      text: 'Thank you for getting my robots back to safety.',
      unlockedBlock: {
        name: 'Resource Discovered Event',
        img: '../../assets/img/tutorials/blocks/resource-dicovered.png'
      }
    }
  }
}
