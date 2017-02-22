const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

module.exports = () => {
  return {
    game: {
      tiles: [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 3, 4, 1],
        [1, 1, 3, 3, 2, 1],
        [1, 3, 3, 2, 1, 1],
        [1, 3, 2, 1, 1, 1],
        [1, 1, 1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 1, y: 4, id: 'ROBOT', orientation: ORIENTATION.BACK })
      ]
    },

    editor: {
      workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="start_handler" x="50" y="50" deletable="false">
</block>
</xml>`,

      toolbox: `<xml id="toolbox" style="display: none">
                <category name="Code Blocks" colour="${blockColors.EVENT_COLOR}">
                    <block type="move"></block>
                    <block type="rotate"></block>
                </category>
              </xml>`
    },

    label: 'Turn - ZigZag',

    goals: [
      {
        type: 'moveTo',
        params: {position: {x: 4, y: 1}, entity: 'ROBOT'},
        desc: 'Move the robot to the stone tile',
        isMandatory: true
      },
      {
        type: 'dontTouchTileType',
        params: {tileID: 2, entity: 'ROBOT'},
        desc: 'Do not get your robot dirty to impress in an impressive way.',
        isMandatory: false
      }
    ],

    storyModal: {
      text: `Alright, I see you figured how to turn left. But you can also turn right. Crazy, i know.`,
      hint: ''
    },
    
    winModal: {
      text: `Anything inside this block will be repeated as many times as defined by the number`,
      unlockedBlock: { name: 'Repeat', img: '../../assets/img/tutorials/blocks/repeat-10-block.png' }
    }

  }
}
