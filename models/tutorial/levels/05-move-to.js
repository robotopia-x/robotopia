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
      entities.robot({ x: 0, y: 0, id: 'ROBOT', teamId: 1 }),
      entities.tutorialBase({ x: 5, y: 5, id: 'BASE', teamId: 1 })
    ]
  },

  editor: {
    workspace: `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="start_handler" id="!o0D0w#D7c3RJ_[d[KgX" x="50" y="50" deletable="false"></block>
    </xml>
  `,

    toolbox: `
      <xml id="toolbox" style="display: none">
        <category name="Movement" colour="40">
          <block type="move_to"></block>
        </category>
      </xml>
    `
  },

  label: 'Move to the base',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 5, y: 5 }, entity: 'ROBOT' },
      desc: 'Move Morty to his base',
      isMandatory: true
    },
    {
      type: 'maxBlocks',
      params: { amount: 1 },
      desc: 'Use a maximum of 1 Blocks',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'This is getting out of hand Morty. I added a new command which let\'s you tell the robot the exact position you want it to move to. Try it out!',
    hint: 'Observe the behaviour of the move to block.'
  },

  nextTutorial: 'collect-5-resources'
}
