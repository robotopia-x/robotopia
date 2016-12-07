/* global Blockly */

Blockly.JavaScript.main_logic = function(block) {
  var statements_main = Blockly.JavaScript.statementToCode(block, 'Main')
  var code = '...;\n';
  console.log(statements_main)
}

Blockly.JavaScript.event_logic = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var statements_event = Blockly.JavaScript.statementToCode(block, 'Event');
  var code = '...;\n';
  console.log(dropdown_name, statements_event)
}

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
