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
        [1, 3, 1, 3, 3, 3, 1, 3, 1],
        [1, 3, 1, 3, 1, 3, 1, 3, 1],
        [1, 3, 1, 3, 1, 4, 1, 3, 1],
        [1, 3, 1, 3, 1, 1, 1, 3, 1],
        [1, 3, 1, 3, 3, 3, 3, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 1, y: 7, id: 'ROBOT', orientation: ORIENTATION.BACK })
      ]
    },

    editor: {
      workspace: `
        <xml xmlns="http://www.w3.org/1999/xhtml">
          <block type="start_handler" x="50" y="50" deletable="false">
            <statement name="body">
              <block type="controls_repeat"/>
              <field name="TIMES">3</field>
              <statement name="DO">
                <block type="controls_if"/>
              </statement>
            </statement>
          </block>
        </xml>
      `,

      toolbox: `
        <xml id="toolbox" style="display: none">
          <category name="Code Blocks" colour="${blockColors.EVENT_COLOR}">
            <block type="move"></block>
            <block type="rotate"></block>
            <block type="controls_repeat"></block>
            <block type="controls_if"></block>
            <block type="is_next_field"></block>
          </category>
        </xml>
      `
    },

    label: 'If - Right Round',

    goals: [
      {
        type: 'touchTile',
        params: { tileID: 4 },
        desc: 'Move to the metal tile',
        isMandatory: true
      },
      {
        type: 'maxBlocks',
        params: { amount: 5 },
        desc: 'Use a maximum of 5 blocks',
        isMandatory: false
      }
    ],

    storyModal: {
      text: `This puzzle looks quite hard, good thing you just got the If-Block. With this block, this level should be no problem at all`,
      hint: 'It might look hard, but you can simply check if the next tile is water'
    },

    winModal: {
      text: `Your're a beast!`
    }
  }
}
