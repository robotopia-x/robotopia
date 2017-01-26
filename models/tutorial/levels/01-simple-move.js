const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [4, 1, 3],
      [4, 1, 4],
      [4, 1, 4],
      [4, 4, 4]
    ],

    entities: [
      entities.robot({ x: 0, y: 0, id: 'ROBOT' })
    ]
  },

  editor: {
    workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',

    toolbox: `
      <xml id="toolbox" style="display: none">
        <category name="Movement" colour="40">
          <block type="move"></block>
          <block type="rotate"></block>
        </category>
      </xml>
    `
  },

  label: 'Simple movement',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 2, y: 0 }, entity: 'ROBOT' },
      desc: 'Move the robot to the grass',
      isMandatory: true
    },
    {
      type: 'useBlock',
      params: { type: 'rotate' },
      desc: `Use at least 1 rotate block`,
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Hey Morty, I build this robot to help us on our space adventures. I need your help programming it. Can you make it move to the grass field.',
    hint: 'Instead of the rotate block you can also only use move blocks with the different directions',
    img: '../../assets/img/tutorials/simple-move.png'
  },

  nextTutorial: 'simple-loops'
}
