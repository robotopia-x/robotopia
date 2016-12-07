/* global Blockly */

Blockly.JavaScript.mainLogic = function (block) {
  var statementsMain = Blockly.JavaScript.statementToCode(block, 'Main')
  console.log(statementsMain)
}

Blockly.JavaScript.eventLogic = function (block) {
  var dropdownName = block.getFieldValue('NAME')
  var statementsEvent = Blockly.JavaScript.statementToCode(block, 'Event')
  console.log(dropdownName, statementsEvent)
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
