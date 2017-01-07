const entities = require('../entities')

module.exports = {
  state: {
    tiles: [
      [1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1]
    ],

    entities: [
      entities.robot({x: 2, y: 5, id: 'ROBOT'}),
      entities.gem({x: 0, y: 0})
    ]
  },

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 0, y: 6 }, entity: 'ROBOT' },
      desc: 'Move the Robot into the goal'
    },
    {
      type: 'collectResource',
      params: {},
      desc: 'Collect 3 Gems'
    }
  ],

  storyModal: {
    text: 'Once upon a time, there was a small robot who died... The end',
    hint: 'You can also only use Move with the different directions',
    img: '../assets/img/tutorials/tutorial2.png'
  },

  workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="rotate" id="bizsM0~3M?%9v:^sintR" x="235" y="155"><field name="Direction">LEFT</field></block></xml>',

  toolbox: `<xml id="toolbox" style="display: none">
                <category name="Logic" colour="100">
                  <block type="controls_repeat_ext"></block>
                  <block type="math_number"></block>
                </category>
           </xml>`
}
