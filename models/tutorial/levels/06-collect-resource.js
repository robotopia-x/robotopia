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
          <block type="move_to"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Numbers" colour="230">
          <block type="math_number"></block>
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
      params: { type: 'move_to' },
      desc: 'Use the Move to Block',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Ohh no, you are running low on resources... Go to the gem and collect a resource',
    hint: 'You can use the move to Block with x and y positions, too. Just start counting at 0.',
    img: '../../assets/img/tutorials/collect-resource.png'
  },

  nextTutorial: 'deposit-resource'
}
