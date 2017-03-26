const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

module.exports = () => {
  return {
    game: {
      tiles: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 4, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 1, y: 7, id: 'ROBOT', orientation: ORIENTATION.BACK }),
        entities.chest({ x: 7, y: 7, orientation: 'BACK'})
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

    label: 'Loops - Nesting',

    goals: [
      {
        type: 'moveTo',
        params: {position: {x: 7, y: 7}, entity: 'ROBOT'},
        desc: 'Move the robot to the metal tile',
        isMandatory: true
      },
      {
        type: 'maxBlocks',
        params: {amount: 4},
        desc: 'Use a maximum of four blocks',
        isMandatory: false
      },
      {
        type: 'useBlockWithinBlock',
        params: { outerBlock: 'controls_repeat', innerBlock: 'controls_repeat' },
        desc: 'Nest a repeat block inside another repeat block',
        isMandatory: false
      }
    ],

    storyModal: {
      text: `Well done! Now here is a difficult one..`,
      hint: 'You can use a repeat inside a repeat.'
    },

    winModal: {
      text: `What comes next? - Loops Hard Mode!`,
      unlockedBlock: { name: 'If-Condition Block', img: '../../assets/img/tutorials/blocks/if-condition.png' }
    }
  }
}
