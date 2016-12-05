/* global Blockly */

Blockly.JavaScript.move = function (block) {
  var dropdownMove = block.getFieldValue('Move')
  return 'move(' + '"' + dropdownMove + '"' + ')\n'
}

Blockly.JavaScript.rotate = function (block) {
  var dropdownDirection = block.getFieldValue('Direction')
  return 'rotate(' + '"' + dropdownDirection + '"' + ')\n'
}

Blockly.JavaScript.place_marker = function (block) {
  return 'placeMarker()\n'
}

Blockly.JavaScript.collect_resource = function (block) {
  return 'collectResource()\n'
}
