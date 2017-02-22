const entities = require('../../models/game/entities')

module.exports = () => {
  return {
    game: {
      tiles: [
        [4],
        [3],
        [3],
        [3],
        [3]
      ],

      entities: [
        entities.tutorialRobot({ x: 0, y: 4, id: 'ROBOT', orientation: 0 })
      ]
    },

    editor: {
      workspace: `<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="start_handler" x="50" y="50" deletable="false">
    <statement name="body">
    <block type="move">
    <next>
        <block type="move"></block>
    </next>
</block>
</statement>
</block>
</xml>`,

      toolbox: `<xml id="toolbox" style="display: none">
                <category name="Code Blocks" colour="40">
                    <block type="move"></block>
                </category>
              </xml>`
    },

    label: 'Blockly',

    goals: [
      {
        type: 'moveTo',
        params: {position: {x: 0, y: 0}, entity: 'ROBOT'},
        desc: 'Move the robot to the stone tile',
        isMandatory: true
      }
    ],

    storyModal: {
      text: 'Hey Morty, I build this robot to help us on our space adventures. I need your help programming it. Can you make it move to the grass field.',
      hint: ''
    },

    winModal: {
      text: 'Next one will not be that easy',
      unlockedBlock: {
        name: 'Rotate',
        img: '../../assets/img/tutorials/rotate-dropdown.PNG'
      }
    },

    nextTutorial: 'turn',

    highlighters: {
      classes: ['play-button']
    }
  }
}
