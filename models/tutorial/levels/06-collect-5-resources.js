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
      entities.tutorialRobot({ x: 0, y: 5, id: 'ROBOT', teamId: 1, hasResource: false }),
      entities.gem({ x: 0, y: 0 }),
      entities.tutorialBase({ x: 0, y: 5, id: 'BASE', teamId: 1 })
    ],

    teams: {
      1: { resources: 0, points: 0 }
    }
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
          <block type="move_to"></block>          
          <block type="move_to_entity"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Actions" colour="50">
          <block type="collect_resource"></block>
          <block type="deposit_resource"></block>
        </category>
      </xml>
    `
  },

  label: 'Collect resources',

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
      desc: 'Use the move to block',
      isMandatory: false
    },
    {
      type: 'useBlock',
      params: { type: 'controls_repeat' },
      desc: 'Use at least 1 repeat block',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Now that you have learned how to collect resources, go for it and get 5 pieces.',
    hint: 'Do not forget that a robot can only carry 1 resource at a time',
    img: '../../assets/img/tutorials/collect-5-resources.png'
  }
}
