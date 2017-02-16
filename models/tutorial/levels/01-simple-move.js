const { ORIENTATION } = require('../../../lib/utils/types')
const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [4, 4, 4],
      [4, 1, 4],
      [4, 1, 4],
      [4, 1, 3]
    ],

    entities: [
      entities.tutorialRobot({ x: 0, y: 3, id: 'ROBOT', orientation: ORIENTATION.BACK })
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
          <block type="move"></block>
          <block type="rotate"></block>
        </category>
      </xml>
    `
  },

  label: 'Simple movement',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 2, y: 3 }, entity: 'ROBOT' },
      desc: 'Move the robot to the grass',
      isMandatory: true
    },
    {
      type: 'useBlock',
      params: { type: 'rotate' },
      desc: `Use at least 1 rotate block`,
      isMandatory: false
    }
  ],

  instructions: [
    'Drag the move block out of the side bar.',
    'Stack the blocks on top of each other to create the logic',
    'You can delete a block by either dragging it into the bin (bottom right) or into the sidebar'
  ],

  storyModal: {
    text: 'Hey Morty, I build this robot to help us on our space adventures. I need your help programming it. Can you make it move to the grass field.',
    hint: 'Instead of the rotate block you can also only use move blocks with the different directions'
  },

  nextTutorial: 'simple-loops'
}
