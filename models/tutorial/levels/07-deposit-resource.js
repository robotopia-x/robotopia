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
      entities.tutorialRobot({ x: 1, y: 4, id: 'ROBOT', teamId: 'RED', hasResource: true }),
      entities.gem({ x: 0, y: 4 }),
      entities.tutorialBase({ x: 1, y: 0, id: 'BASE', teamId: 'RED' })
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
          <block type="deposit_resource"></block>
        </category>
      </xml>
    `
  },

  label: 'deposit the resources',

  goals: [
    {
      type: 'carryResource',
      params: { hasResource: false },
      desc: 'Deposit 1 resource',
      isMandatory: true
    },
    {
      type: 'doNotUseBlock',
      params: { type: 'controls_repeat' },
      desc: 'Do not use any repeat Block',
      isMandatory: false
    },
    {
      type: 'useBlock',
      params: { type: 'move_to' },
      desc: 'Use the move to Block',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Now that you have a resource, go back to your base and deposit it there.',
    hint: 'A robot can only hold 1 resource, that can only be deposited in the base',
    img: '../../assets/img/tutorials/collect-resource.png'
  },

  nextTutorial: 'collect-5-resources'
}
