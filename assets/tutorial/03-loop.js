const entities = require('../../models/game/entities')

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
      entities.tutorialRobot({ x: 1, y: 7, id: 'ROBOT', orientation: 0 })
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
                <category name="Code Blocks" colour="40">
                    <block type="move"></block>
                    <block type="rotate"></block>
                    <block type="controls_repeat"></block>
                </category>
              </xml>`
    },

    label: 'Loop',

    goals: [
      {
        type: 'moveTo',
        params: {position: {x: 7, y: 7}, entity: 'ROBOT'},
        desc: 'Move the robot to the stone tile',
        isMandatory: true
      },
      {
        type: 'useBlockWithinBlock',
        params: {outerBlock: 'controls_repeat', innerBlock: 'controls_repeat'},
        desc: 'Use a repeat inside a repeat',
        isMandatory: false
      }
    ],

    storyModal: {
      text: '',
      hint: '',
      img: 'assets/img/tutorials/simple-move.png'
    },

    nextTutorial: 'scout'
  }
}