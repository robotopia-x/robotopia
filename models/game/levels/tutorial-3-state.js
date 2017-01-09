const entities = require('../entities')

module.exports = {
  state: {
    tiles: [
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 2],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]
    ],

    entities: [
      entities.robot({x: 0, y: 0, id: 'ROBOT'})
    ]
  },

  goals: [
    {
      type: 'moveTo',
      params: { position: { x: 10, y: 0 }, entity: 'ROBOT' },
      desc: 'Move the Robot to the grass'
    }
  ],

  storyModal: {
    text: 'Ohh no, this time Robot Rick has to travel longer... Good thing you now know how to use loops (Do you see the pattern?). Use the Move the Repeat Blocks',
    hint: 'Try nesting loops to get the shortest possible solution',
    img: '../assets/img/tutorials/tutorial3.png'
  },

  workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>',

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
