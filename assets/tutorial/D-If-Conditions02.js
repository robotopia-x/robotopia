const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

module.exports = () => {
  return {
    game: {
      tiles: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 3, 2, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 3, 3, 3, 3, 2, 1],
        [1, 1, 2, 1, 3, 1, 1, 3, 1, 1],
        [1, 3, 3, 3, 3, 5, 1, 3, 1, 1],
        [1, 1, 3, 1, 1, 1, 1, 3, 1, 1],
        [1, 1, 3, 1, 5, 1, 1, 3, 4, 1],
        [1, 2, 3, 3, 3, 3, 1, 5, 1, 1],
        [1, 1, 1, 1, 3, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 4, y: 8, id: 'ROBOT', orientation: ORIENTATION.BACK })
      ]
    },

    editor: {
      workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="start_handler" x="50" y="50" deletable="false">
    <statement name="body">
    <block type="move" deletable="false"></block>
</statement>
</block>
</xml>`,

      toolbox: `<xml id="toolbox" style="display: none">
                <category name="Code Blocks" colour="${blockColors.EVENT_COLOR}">
                    <block type="rotate"></block>
                    <block type="controls_repeat"></block>
                    <block type="controls_if"></block>
                    <block type="is_next_field"></block>
                </category>
              </xml>`
    },

    label: 'If - Follow The Signs',

    goals: [
      {
        type: 'touchTile',
        params: { tileID: 4 },
        desc: 'Move to the metal tile',
        isMandatory: true
      }
    ],

    storyModal: {
      text: `Now you known the power of an If-Block... This time, you have to solve the level with a single Move-Block`,
      hint: 'Try to see the pattern, the blocks give an indication where to go.'
    },

    winModal: {
      text: `Next one won't be so easy!`
    }
  }
}
