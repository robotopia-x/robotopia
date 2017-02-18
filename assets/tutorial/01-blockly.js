const entities = require('../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [4],
      [3],
      [3],
      [3],
      [3]
    ],

    entities: [
      entities.robot({ x: 0, y: 4, id: 'ROBOT' })
    ]
  },

  editor: {
    workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',

    toolbox: `
      <xml id="toolbox" style="display: none">
        <category name="Movement" colour="40">
          <block type="move"></block>
        </category>
      </xml>
    `
  },

  label: 'Blockly',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 0, y: 0 }, entity: 'ROBOT' },
      desc: 'Move the robot to the stone tile',
      isMandatory: true
    }
  ],

  storyModal: {
    text: 'Hey Morty, I build this robot to help us on our space adventures. I need your help programming it. Can you make it move to the grass field.',
    hint: '',
    img: '..//img/tutorials/simple-move.png'
  },

  nextTutorial: 'simple-loops'
}
