const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [1, 4, 4, 4, 4, 4],
      [1, 1, 1, 1, 1, 4],
      [1, 1, 1, 1, 1, 4],
      [1, 1, 1, 1, 1, 4],
      [2, 4, 4, 4, 4, 4]
    ],

    entities: [
      entities.robot({ x: 1, y: 0, id: 'ROBOT' }),
      entities.gem({ x: 0, y: 4 })
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
        
        <sep gap="8"></sep>
        
        <category name="Actions" colour="50">
          <block type="collect_resource"></block>
        </category>
      </xml>
    `
  },

  label: 'collect a resource',

  goals: [
    {
      type: 'carryResource',
      params: { hasResource: true },
      desc: 'Collect 1 Resource',
      isMandatory: true
    },
    {
      type: 'useBlock',
      params: { type: 'controls_repeat' },
      desc: 'Use at least 1 repeat Block',
      isMandatory: false
    },
    {
      type: 'maxBlocks',
      params: { amount: 8 },
      desc: 'Use a maximum of 8 Blocks',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Ohh no, you are running low on resources... Go to the gem and collect a resource',
    hint: '',
    img: '../../assets/img/tutorials/simple-loops.png'
  },
}
