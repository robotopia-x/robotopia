const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [2, 4, 4, 4, 4, 4],
      [1, 1, 1, 1, 1, 4],
      [1, 4, 4, 4, 4, 4],
      [1, 4, 1, 1, 1, 1],
      [1, 4, 1, 1, 1, 1],
      [4, 4, 1, 1, 1, 1]
    ],

    entities: [
      entities.tutorialRobot({ x: 0, y: 5, id: 'ROBOT', teamId: 'RED', hasResource: false }),
      entities.gem({ x: 0, y: 0 }),
      entities.tutorialBase({ x: 0, y: 5, id: 'BASE', teamId: 'RED' })
    ],

    teams: {
      RED: { resources: 0, points: 0 }
    }
  },

  editor: {
    workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',

    toolbox: `
      <xml id="toolbox" style="display: none">
        <category name="Movement" colour="250">
          <block type="move"></block>
          <block type="rotate"></block>
          <block type="move_to"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Numbers" colour="230">
          <block type="math_number"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Variables" colour="170">
          <block type="base_position_x"></block>
          <block type="base_position_y"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Loops" colour="120">
          <block type="controls_repeat_ext"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Actions" colour="50">
          <block type="collect_resource"></block>
          <block type="deposit_resource"></block>
        </category>
      </xml>
    `
  },

  label: 'collect 50 resources',

  goals: [
    {
      type: 'collectResources',
      params: { amount: 50 },
      desc: 'Collect 50 resources',
      isMandatory: true
    },
    {
      type: 'useBlock',
      params: { type: 'move_to' },
      desc: 'Use the move to Block',
      isMandatory: false
    },
    {
      type: 'useBlock',
      params: { type: 'controls_repeat_ext' },
      desc: 'Use at least 1 repeat Block',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Now that you have learned how to collect resources, go for it and get 5 pieces.',
    hint: 'Do not forget that a robot can only carry 1 resource at a time',
    img: '../../assets/img/tutorials/collect-5-resources.png'
  }
}
