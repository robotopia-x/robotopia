const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

module.exports = () => {
  return {
    game: {
      tiles: [
        [1, 1, 1, 1, 1, 1],
        [1, 4, 4, 4, 4, 1],
        getRandomTileRow(),
        [1, 3, 3, 3, 3, 1],
        getRandomTileRow(),
        [1, 3, 3, 3, 3, 1],
        getRandomTileRow(),
        [1, 3, 3, 3, 3, 1],
        getRandomTileRow(),
        [1, 3, 3, 3, 3, 1],
        [1, 1, 1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 2, y: 9, id: 'ROBOT', orientation: ORIENTATION.BACK })
      ]
    },

    editor: {
      workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="start_handler" x="50" y="50" deletable="false">
    <statement name="body">
    <block type="controls_repeat">
    <field name="TIMES">3</field>
    <statement name="DO">
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
                    <block type="controls_if"></block>
                    <block type="is_next_field"></block>
                </category>
              </xml>`
    },

    label: 'Conditions - Hard Mode',

    goals: [
      {
        type: 'touchTile',
        params: { tileID: 4 },
        desc: 'Move the robot to any of the metal tiles',
        isMandatory: true
      }
    ],

    storyModal: {
      text: `Here comes the mastery challenge! If you can solve this puzzle, you are well prepared for the upcoming challenges.`,
      hint: 'If you want to skip this level, you can simply click on the logo on the upper left corner to get back to the overview'
    },

    winModal: {
      text: `Incredible! You really are on a run.`
    }
  }
}

function getRandomTileRow () {
  const cases = [
    [1, 3, 3, 3, 1, 1],
    [1, 3, 3, 1, 3, 1],
    [1, 3, 1, 3, 3, 1],
    [1, 1, 3, 3, 3, 1]
  ]

  return cases[Math.floor(Math.random() * cases.length)]
}
