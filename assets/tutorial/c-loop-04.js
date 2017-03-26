const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

module.exports = () => {
  return {
    game: {
      tiles: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1],
        [1, 3, 1, 1, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1],
        [1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 1],
        [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1],
        [1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1],
        [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3, 3, 3, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 1, y: 9, id: 'ROBOT', orientation: ORIENTATION.BACK })
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

    label: 'Loops - Hard Mode',

    goals: [
      {
        type: 'moveTo',
        params: {position: {x: 9, y: 13}, entity: 'ROBOT'},
        desc: 'Move the robot to the metal tile',
        isMandatory: true
      },
      {
        type: 'maxBlocks',
        params: {amount: 17},
        desc: 'Use a maximum of 17 blocks',
        isMandatory: false
      }
    ],

    storyModal: {
      text: `You're doing really great!`,
      hint: 'Try to look for the pattern. If you find it, things are way easier... (If it is too hard, you can always click on the logo in the upper left corner to get back to the overview.)'
    },

    winModal: {
      text: `You are the Loop-King!`
    }
  }
}
