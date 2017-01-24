const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [1, 4, 4, 4, 4, 4, 4, 4, 1, 4],
      [1, 4, 1, 1, 1, 1, 1, 4, 1, 4],
      [1, 4, 1, 4, 4, 4, 1, 4, 1, 4],
      [1, 4, 1, 4, 1, 4, 1, 4, 1, 4],
      [1, 4, 1, 4, 1, 1, 1, 4, 1, 4],
      [1, 4, 1, 4, 4, 4, 4, 4, 1, 4],
      [1, 4, 1, 1, 1, 1, 1, 1, 1, 4],
      [1, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    ],

    entities: [
      entities.robot({ x: 0, y: 0, id: 'ROBOT', teamId: 'RED' }),
      entities.tutorialBase({ x: 5, y: 5, id: 'BASE', teamId: 'RED' })
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
        
        <category name="Variables" colour="170">
          <block type="base_position_x"></block>
          <block type="base_position_y"></block>
        </category>
      </xml>
    `
  },

  label: 'move to the base',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 5, y: 5 }, entity: 'ROBOT' },
      desc: 'Move the robot to his base',
      isMandatory: true
    },
    {
      type: 'maxBlocks',
      params: { amount: 3 },
      desc: 'Use a maximum of 3 Blocks',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Look at that path... We would need a whole lot of blocks for that. Good thing we have a Move To Block which will make things way easier',
    hint: 'Observe the behaviour of the move to block.',
    img: '../../assets/img/tutorials/move-to.png'
  },

  nextTutorial: 'collect-resource'
}
