const entities = require('../entities')

module.exports = {
  state: {
    tiles: [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 2]
    ],

    entities: [
      entities.robot({x: 0, y: 0, id: 'ROBOT'})
    ]
  },

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 1, y: 11 }, entity: 'ROBOT' },
      desc: 'Move the Robot to the grass'
    }
  ],

  storyModal: {
    text: 'Look at that way to the goal... It looks like we need a lot of blocks to get there. But wait, there are repeat blocks, which will make the work easier. Use the Move and Repeat Blocks',
    hint: 'You can also do this without the repeat block.',
    img: '../assets/img/tutorials/tutorial2.png'
  },

  workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="rotate" id="bizsM0~3M?%9v:^sintR" x="235" y="155"><field name="Direction">LEFT</field></block></xml>',

  toolbox: `<xml id="toolbox" style="display: none">
                <category name="Movement" colour="250">
                  <block type="move"></block>
                  <block type="rotate"></block>
                </category>
                
                <category name="Numbers" colour="230">
                  <block type="math_number"></block>
                </category>
                
                <category name="Loops" colour="120">
                  <block type="controls_repeat_ext"></block>
                </category>
           </xml>`
}
