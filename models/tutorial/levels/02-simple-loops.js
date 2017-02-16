const { ORIENTATION } = require('../../../lib/utils/types')
const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [4, 3],
      [4, 1],
      [4, 1],
      [4, 1],
      [4, 1],
      [4, 1],
      [4, 1],
      [4, 1],
      [4, 1],
      [4, 1],
      [4, 1],
      [4, 1]
    ],

    entities: [
      entities.tutorialRobot({ x: 0, y: 11, id: 'ROBOT', orientation: ORIENTATION.BACK })
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

  label: 'Simple loops',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 1, y: 0 }, entity: 'ROBOT' },
      desc: 'Move Morty to the grass',
      isMandatory: true
    },
    {
      type: 'maxBlocks',
      params: { amount: 4 },
      desc: 'Use at most 4 blocks',
      isMandatory: false
    }
  ],

  instructions: [
    'Drag and drop the Repeat Block out of the side bar',
    'Solve this riddle with the given loop block'
  ],

  storyModal: {
    text: 'Looks like we need a lot of blocks to get to the grass field Morty. Good thing I added a new repeat block which let\'s the robot do commands multiple times.',
    hint: 'You can also do this without the repeat block.'
  },

  nextTutorial: 'nested-loops-1'
}
