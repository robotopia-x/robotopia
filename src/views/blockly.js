const html = require('choo/html')

const toolbox = `<xml id="toolbox" style="display: none">
      <category name="Logic">
        <block type="controls_if"></block>
        <block type="controls_repeat_ext"></block>
        <block type="logic_compare"></block>
        <block type="math_number"></block>
        <block type="math_arithmetic"></block>
        <block type="text"></block>
        <block type="text_print"></block>
      </category>
      <sep></sep>
      <category name="Movement" colour="210">
        <block type="move"></block>
        <block type="rotate"></block>
      </category>
    </xml>`

Blockly.JavaScript.move = function (block) {
  var dropdownMove = block.getFieldValue('Move')
  return 'moveInDir(' + '"' + dropdownMove + '"' + ')\n'
}

function moveInDir (dir) {
  switch (dir) {
    case 'LEFT':
      console.log('move left')
      break
    case 'RIGHT':
      console.log('move right')
      break
    case 'UP':
      console.log('move up')
      break
    case 'DOWN':
      console.log('move down')
      break
  }
}

Blockly.JavaScript.rotate = function (block) {
  var dropdownDirection = block.getFieldValue('Direction')
  return 'rotateInDir(' + '"' + dropdownDirection + '"' + ')\n'
}

function rotateInDir (dir) {
  switch (dir) {
    case 'LEFT':
      console.log('rotate left')
      break
    case 'RIGHT':
      console.log('rotate right')
      break
  }
}

const blocklyView = (state, prev, send) => {
  return html`
    <div id="blocklyDiv" onload=${(el) => {
      console.log(el)
      var workspace = Blockly.inject(el.id,
        {toolbox: toolbox})
      workspace.addChangeListener(myUpdateFunction)
      
      function myUpdateFunction (event) {
        var code = Blockly.JavaScript.workspaceToCode(workspace)
        eval(code)
      }
    }}></div>
  `
}

module.exports = blocklyView
