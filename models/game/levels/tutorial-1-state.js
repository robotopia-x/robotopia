const entities = require('../entities')

module.exports = {
  state: {
    tiles: [
      [1, 0, 2],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1]
    ],

    entities: [
      entities.robot({x: 0, y: 0, id: 'ROBOT'})
    ]
  },

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 2, y: 0 }, entity: 'ROBOT' },
      desc: 'Move the Robot to the grass'
    }
  ],

  storyModal: {
    text: 'Robot Rick got lost in his laboratory, help him find the way to his garden by moving him onto the grass field. Use the Move and Rotate Blocks',
    hint: 'You can also only use Move with the different directions',
    img: '../assets/img/tutorials/tutorial1.png'
  },

  workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',

  toolbox: `
    <xml id="toolbox" style="display: none">
        <category name="Movement" colour="250">
          <block type="move"></block>
          <block type="rotate"></block>
        </category>
   </xml>`
}
