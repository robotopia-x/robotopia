const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 3],
      [4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4],
      [4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4],
      [4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4]
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
      
      <sep gap="8"></sep>
      
      <category name="Numbers" colour="230">
        <block type="math_number"></block>
      </category>
      
      <sep gap="8"></sep>
      
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
      desc: 'Move the robot to the grass',
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
    text: 'Ohh no, looks like you are running out of resources... Quick, go to the gem and collect 1',
    hint: 'Note that you do not need to walk on the gem, around it is perfectly fine.',
    img: '../../assets/img/tutorials/complex-loops-2.png'
  },

  nextTutorial: 'move-to'
}
