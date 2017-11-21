const { ORIENTATION } = require('../../lib/utils/types')
const entities = require('../../models/game/entities')
const blockColors = require('../../elements/blockly/colors')

module.exports = () => {
  return {
    id: 'resource01',

    game: {
      tiles: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 2, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1],
        [1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1],
        [1, 4, 1, 1, 1, 3, 3, 3, 3, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      ],

      entities: [
        entities.tutorialRobot({ x: 1, y: 9, id: 'ROBOT', orientation: ORIENTATION.BACK, teamId: 1, discoverRange: 3, showRange: 3, resource: {hasResource: false, chunk: 0} }),
        entities.tutorialBase({ x: 1, y: 9, id: 'BASE', teamId: 1 }),
        entities.gem({ x: 5, y: 4, value: 100, chunks: 10, color: 'BLUE' })
      ],

      teams: {
        1: { resources: 0, points: 0 }
      }
    },

    editor: {
      workspace: `
        <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="start_handler" x="50" y="50" deletable="false"></block>
            <block type="resource_event_handler" x="50" y="200" deletable="false"></block>
        </xml>
      `,

      toolbox: `
        <xml id="toolbox" style="display: none">
          <category name="Code Blocks" colour="${blockColors.EVENT_COLOR}">
              <block type="move"></block>
              <block type="rotate"></block>
              <block type="controls_repeat"></block>
              <block type="move_to_entity"></block>
              <block type="collect_resource"></block>
          </category>
        </xml>
      `
    },

    goals: [
      {
        id: 'carryResource',
        type: 'carryResource',
        params: { hasResource: true },
        isMandatory: true
      }
    ]
  }
}
