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
  return 'robot.collectResource()\n'
}

Blockly.JavaScript.move_to = function(block) {
  var number_xpos = block.getFieldValue('XPOS');
  var number_ypos = block.getFieldValue('YPOS');
  var code = ''//pathfinder.getMovementCommands({ x: 0, y: 0}, { x: 10, y: 10 })
  console.log(code)
}
