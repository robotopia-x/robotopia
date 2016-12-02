/* global Blockly */

Blockly.JavaScript.move = function (block) {
  var dropdownMove = block.getFieldValue('Move')
  return 'move(' + '"' + dropdownMove + '"' + ')\n'
}

Blockly.JavaScript.rotate = function (block) {
  var dropdownDirection = block.getFieldValue('Direction')
  return 'rotate(' + '"' + dropdownDirection + '"' + ')\n'
}

Blockly.JavaScript['goto'] = function (block) {
  var dropdownLocation = block.getFieldValue('location')
  return 'goto("' + dropdownLocation + '")\n'
}
