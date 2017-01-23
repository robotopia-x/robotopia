const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [4, 1, 1, 1, 1, 1, 1, 1, 1],
      [4, 4, 4, 1, 1, 1, 1, 1, 1],
      [1, 1, 4, 4, 4, 1, 1, 1, 1],
      [1, 1, 1, 1, 4, 4, 4, 1, 1],
      [1, 1, 1, 1, 1, 1, 4, 4, 3]
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
        
        <category name="Numbers" colour="230">
          <block type="math_number"></block>
        </category>
        
        <category name="Loops" colour="120">
          <block type="controls_repeat_ext"></block>
        </category>
      </xml>
    `
  },

  label: 'easy nested loops',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 8, y: 4 }, entity: 'ROBOT' },
      desc: 'Move the Robot to the grass',
      isMandatory: true
    },
    {
      type: 'maxBlocks',
      params: { amount: 6 },
      desc: 'Use a maximum of 6 Blocks',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Ohh no, this time Robot Rick has to travel longer... Good thing you now know how to use loops (Do you see the pattern?). Use the Move and Repeat Blocks',
    hint: 'Try nesting loops to get the shortest possible solution',
    img: '../../assets/img/tutorials/complex-loops-1.png'
  },

  nextTutorial: 'nested-loops-2'
}
