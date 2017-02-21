const entities = require('../../models/game/entities')

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
        entities.tutorialRobot({ x: 1, y: 4, id: 'ROBOT', orientation: 0 })
      ]
    },

    editor: {
      workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="start_handler" x="50" y="50" deletable="false">
    <statement name="body">
    <block type="move">
        <next>
            <block type="rotate">
                <field name="direction">RIGHT</field>
                <next>
                    <block type="move">
                        <next>
                            <block type="rotate">
                                <field name="direction">RIGHT</field>
                                <next>
                                    <block type="move"></block>
                                </next>
                            </block>
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
                <category name="Code Blocks" colour="40">
                    <block type="move"></block>
                    <block type="rotate"></block>
                </category>
              </xml>`
    },

    label: 'Turn',

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
        desc: 'Do not get your boots dirty.',
        isMandatory: false
      }
    ],

    storyModal: {
      text: 'I tried and failed. You can delete my Code. Then make the robot move to the stone tile. dont you get my robot dirty!',
      hint: '',
      img: 'assets/img/tutorials/simple-move.png'
    },

    nextTutorial: 'loop'
  }
}
