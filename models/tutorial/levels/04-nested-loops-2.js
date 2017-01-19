const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 2],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]
    ],

    entities: [
      entities.robot({x: 0, y: 0, id: 'ROBOT'})
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
      
      <category name="Numbers" colour="230">
        <block type="math_number"></block>
      </category>
      
      <category name="Loops" colour="120">
        <block type="controls_repeat_ext"></block>
      </category>
    </xml>
  `
  },

  label: 'advanced nested loops',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 10, y: 0 }, entity: 'ROBOT' },
      desc: 'Move the Robot to the grass',
      isMandatory: true
    },
    {
      type: 'maxBlocks',
      params: { amount: 14 },
      desc: 'Use a maximum of 14 Blocks',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Wow, this time the way is even longer... Use the Move and Repeat Blocks',
    hint: 'Try nesting loops to get the shortest possible solution',
    img: '../../assets/img/tutorials/complex-loops-2.png'
  }
}
