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
      entities.robot({ x: 1, y: 4, id: 'ROBOT' }),
      entities.gem({ x: 0, y: 4 }),
      entities.base({ x: 1, y: 0, id: 'BASE' })
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
          <block type="deposit_resource"></block>
        </category>
      </xml>
    `
  },

  label: 'deposit a resource',

  goals: [
    {
      type: 'carryResource',
      params: { hasResource: false },
      desc: 'Collect 1 Resource',
      isMandatory: true
    },
    {
      type: 'doNotUseBlock',
      params: { type: 'controls_repeat' },
      desc: 'Do not use any repeat Block',
      isMandatory: true
    }
  ],

  storyModal: {
    text: 'Now that you have a resource, go back to your base and deposit it there.',
    hint: 'A robot can only hold 1 resource, that can only be deposited in the base',
    img: '../../assets/img/tutorials/collect-resource.png'
  }
}
