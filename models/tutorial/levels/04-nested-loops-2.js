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
      <category name="Loops" colour="100">
        <block type="controls_repeat"></block>
      </category>
    
      <sep gap="8"></sep>
    
      <category name="Movement" colour="40">
        <block type="move"></block>
        <block type="rotate"></block>
      </category>      
    </xml>
  `
  },

  label: 'Advanced nested loops',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 10, y: 0 }, entity: 'ROBOT' },
      desc: 'Move Morty to the grass',
      isMandatory: true
    },
    {
      type: 'maxBlocks',
      params: { amount: 14 },
      desc: 'Use at most 14 blocks',
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
