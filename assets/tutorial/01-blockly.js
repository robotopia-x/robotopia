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
        entities.tutorialRobot({ x: 0, y: 4, id: 'ROBOT', orientation: 2 })
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
      hint: '',
      img: 'assets/img/tutorials/simple-move.png'
    },

    nextTutorial: 'turn',
    
    highlighters: {
      classes: ['play-button']
    }
  }
}