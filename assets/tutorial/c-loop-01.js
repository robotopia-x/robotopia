const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

module.exports = () => {
  return {
    game: {
      tiles: [
        [1, 1, 1, 1],
        [1, 3, 4, 1],
        [1, 3, 1, 1],
        [1, 3, 1, 1],
        [1, 3, 1, 1],
        [1, 3, 1, 1],
        [1, 3, 1, 1],
        [1, 3, 1, 1],
        [1, 3, 1, 1],
        [1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 1, y: 8, id: 'ROBOT', orientation: ORIENTATION.BACK })
      ]
    },

    editor: {
      workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="start_handler" x="50" y="50" deletable="false">
    <statement name="body">
    <block type="controls_repeat">
    <field name="TIMES">3</field>
    <statement name="DO">
        <block type="move"></block>
    </statement>
</block>
</statement>
</block>
</xml>`,

      toolbox: `<xml id="toolbox" style="display: none">
                <category name="Code Blocks" colour="${blockColors.EVENT_COLOR}">
                    <block type="move"></block>
                    <block type="rotate"></block>
                    <block type="controls_repeat"></block>
                </category>
              </xml>`
    },

    label: 'Loops - Getting Lazy',

    goals: [
      {
        type: 'moveTo',
        params: {position: {x: 2, y: 1}, entity: 'ROBOT'},
        desc: 'Move the robot to the metal tile',
        isMandatory: true
      }
    ],

    storyModal: {
      text: `"So far" you are doing surprisingly well. Let's see if you can make it "so far". 
      Haha, I'm so good at making jokes. Probably because I don't need to work anymore. Why are you still listening? Get to work!`,
      hint: ''
    },

    winModal: {
      text: `Not too shabby...`
    }
  }
}
