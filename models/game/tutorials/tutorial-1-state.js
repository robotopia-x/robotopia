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

    stepProgress: 0,

    entities: [
      entities.base({x: 2, y: 5, id: 'BASE'}),
      entities.robot({x: 2, y: 5, id: 'ROBOT'}),
      entities.gem({x: 0, y: 0})
    ]
  },
  workspace: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="move" id="UqpR4v`8/i!re(x3~{AQ" x="155" y="305"><field name="Move">FORWARD</field><next><block type="move" id="x[FVw3mwV4%7/;vvs1XH"><field name="Move">FORWARD</field><next><block type="move" id="`2}Nw53YzN$!$f+vf#Sg"><field name="Move">FORWARD</field></block></next></block></next></block></xml>',
  toolbox: `<xml id="toolbox" style="display: none">
                <category name="Logic" colour="100">
                  <block type="controls_repeat_ext"></block>
                  <block type="math_number"></block>
                </category>
           </xml>`
}
