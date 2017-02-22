const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')

module.exports = () => {
  return {
    game: {
      tiles: [
        [1, 1, 1],
        [1, 4, 1],
        [1, 3, 1],
        [1, 3, 1],
        [1, 3, 1],
        [1, 3, 1],
        [1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 1, y: 5, id: 'ROBOT', orientation: ORIENTATION.BACK })
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
        params: {position: {x: 1, y: 1}, entity: 'ROBOT'},
        desc: 'Move the robot to the stone tile',
        isMandatory: true
      }
    ],

    storyModal: {
      text: `Welcome to Robotopia, where no one (except you) has to work anymore, because WE GOT ROBOTS, that's right! 
      And somebody, I'm talking about you here, has to tell them what to do. Let's start off with a simple task.`,
      hint: ''
    },

    winModal: {
      text: `This block allows you to rotate your robot. The direction can be changed via the dropdown menu inside the block`,
      unlockedBlock: { name: 'Rotate', img: '../../assets/img/tutorials/blocks/rotate-dropdown.PNG' }
    },

    highlighters: {
      classes: ['play-button']
    }
  }
}
