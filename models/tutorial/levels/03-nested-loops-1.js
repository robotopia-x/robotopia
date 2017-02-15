const entities = require('../../../models/game/entities')

module.exports = {
  game: {
    tiles: [
      [4, 1, 1, 1, 1, 1, 1, 1, 1],
      [4, 4, 4, 1, 1, 1, 1, 1, 1],
      [1, 1, 4, 4, 4, 1, 1, 1, 1],
      [1, 1, 1, 1, 4, 4, 4, 1, 1],
      [1, 1, 1, 1, 1, 1, 4, 4, 3]
    ],

    entities: [
      entities.robot({ x: 0, y: 0, id: 'ROBOT' })
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

  label: 'Nested loops',

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 8, y: 4 }, entity: 'ROBOT' },
      desc: 'Move Morty to the grass',
      isMandatory: true
    },
    {
      type: 'maxBlocks',
      params: { amount: 6 },
      desc: 'Use a maximum of 6 Blocks',
      isMandatory: false
    }
  ],

  storyModal: {
    text: 'Things are getting a little bit more complicated Morty ... Good thing you now know how to use repeat blocks. Do you see the pattern?',
    hint: 'Try nesting loops to get the shortest possible solution'
  },

  nextTutorial: 'nested-loops-2'
}
