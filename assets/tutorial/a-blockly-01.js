const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

module.exports = () => {
  return {
    id: 'blockly01',

    game: {
      tiles: [
        [1, 1, 1],
        [1, 4, 1],
        [1, 3, 1],
        [1, 3, 1],
        [1, 3, 1],
        [1, 3, 1],
        [1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 1, y: 5, id: 'ROBOT', orientation: ORIENTATION.BACK }),
        entities.chest({ x: 1, y: 1, orientation: 'FRONT' })
      ]
    },

    editor: {
      workspace: `
        <xml xmlns="http://www.w3.org/1999/xhtml">
          <block type="start_handler" x="50" y="50" deletable="false">
              <statement name="body">
              <block type="move">
              <next>
                  <block type="move"></block>
              </next>
          </block>
          </statement>
          </block>
        </xml>
      `,

      toolbox: `
        <xml id="toolbox" style="display: none">
          <category name="Code Blocks" colour="${blockColors.EVENT_COLOR}">
              <block type="move" ></block>
          </category>
        </xml>
      `
    },

    goals: [
      {
        id: 'goToChest',
        type: 'moveTo',
        params: {position: {x: 1, y: 1}, entity: 'ROBOT'},
        isMandatory: true
      }
    ]
  }
}
