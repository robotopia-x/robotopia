/* global Blockly */

Blockly.JavaScript.main_logic = function (block) {
  var statementsMain = Blockly.JavaScript.statementToCode(block, 'Main')
  console.log(statementsMain)
}

Blockly.JavaScript.event_logic = function (block) {
  var dropdownName = block.getFieldValue('NAME')
  var statementsEvent = Blockly.JavaScript.statementToCode(block, 'Event')
  console.log(dropdownName, statementsEvent)
}

Blockly.JavaScript.move = function (block) {
  var dropdownMove = block.getFieldValue('Move')
  return 'robot.move(' + '"' + dropdownMove + '"' + ')\n'
}

Blockly.JavaScript.rotate = function (block) {
  var dropdownDirection = block.getFieldValue('Direction')
  return 'robot.rotate(' + '"' + dropdownDirection + '"' + ')\n'
}

Blockly.JavaScript.place_marker = function (block) {
  return 'robot.placeMarker()\n'
}

Blockly.JavaScript.collect_resource = function (block) {
  return 'collectResource()\n'
}
