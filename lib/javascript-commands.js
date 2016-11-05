/* global Blockly */

Blockly.JavaScript.move = function (block) {
  var dropdownMove = block.getFieldValue('Move')
  return 'move(' + '"' + dropdownMove + '"' + ')\n'
}
