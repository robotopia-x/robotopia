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
        <category name="Movement" colour="250">
          <block type="move"></block>
          <block type="rotate"></block>
        </category>
      </xml>
    `
  },

  label: 'simple move',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 2, y: 0 }, entity: 'ROBOT' },
      desc: 'Move the Robot to the grass',
      isMandatory: true
    },
    {
      type: 'useBlock',
      params: { type: 'rotate' },
      desc: `Use at least 1 Rotate block`,
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Robot Rick got lost in his laboratory, help him find the way to his garden by moving him onto the grass field. Use the Move and Rotate Blocks',
    hint: 'You can also only use Move with the different directions',
    img: '../../assets/img/tutorials/simple-move.png'
  },

  nextTutorial: 'simple-loops'
}
