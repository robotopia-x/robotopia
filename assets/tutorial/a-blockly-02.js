const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')

module.exports = () => {
  return {
    id: 'blockly02',

    game: {
      tiles: [
        [1, 1, 1, 1],
        [1, 1, 4, 1],
        [1, 1, 3, 1],
        [1, 3, 3, 1],
        [1, 3, 1, 1],
        [1, 3, 3, 1],
        [1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 2, y: 5, id: 'ROBOT', orientation: ORIENTATION.LEFT })
      ]
    },

    editor: {
      workspace: `<xml xmlns='http://www.w3.org/1999/xhtml'>
<block type='start_handler' x='50' y='50' deletable='false'>
    <statement name='body'>
    <block type='move' deletable='false'>
    <next>
        <block type='move' deletable='false' />
    </next>
    <next>
        <block type='move' deletable='false' />
    </next>
    <next>
        <block type='move' deletable='false' />
    </next>
    <next>
        <block type='move' deletable='false' />
    </next>
    <next>
        <block type='move' deletable='false' />
    </next>
    <next>
        <block type='rotate' deletable='false' />
    </next>
    <next>
        <block type='rotate' deletable='false' />
    </next>
    <next>
        <block type='rotate' deletable='false' />
    </next>
</block>
</statement>
</block>
</xml>`,

      toolbox: `<xml id='toolbox' style='display: none'>
                <category />
              </xml>`
    },

    goals: [
      {
        id: 'goToChest',
        type: 'moveTo',
        params: { position: { x: 2, y: 1 }, entity: 'ROBOT' },
        isMandatory: true
      }
    ]
  }
}
