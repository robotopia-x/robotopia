const entities = require('../entities')

module.exports = {
  state: {
    tiles: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ],

    stepProgress: 0,

    entities: [
      entities.base({x: 0, y: 0, id: 'BASE'}),
      entities.robot({x: 0, y: 0, id: 'ROBOT'}),
      entities.gem({x: 6, y: 6})
    ]
  },
  goals: [
    { type: 'moveTo', params: { position: { x: 0, y: 3 }, entity: 'ROBOT' }, desc: 'Move the Robot into the goal'},
    { type: 'collectResource', params: {}, desc: 'Collect 3 Gems'}
  ],
  workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',
  toolbox: `
          <xml id="toolbox" style="display: none">
              <category name="Logic" colour="100">
                <block type="controls_repeat_ext"></block>
                <block type="math_number"></block>
              </category>
              
              <sep gap="8"></sep>
              
              <category name="Variables" colour="170">
                <block type="marker"></block>
              </category>
              
              <sep gap="8"></sep>
              
              <category name="Movement" colour="250">
                <block type="move"></block>
                <block type="rotate"></block>
                <block type="move_to"></block>
              </category>
          </xml>`
}
