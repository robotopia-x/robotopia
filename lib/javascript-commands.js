/* global Blockly */
Blockly.JavaScript.main_logic = function (block) {
  const statementsMain = Blockly.JavaScript.statementToCode(block, 'Main')
  console.log(statementsMain)
}

Blockly.JavaScript.event_logic = function (block) {
  const dropdownName = block.getFieldValue('NAME')
  const statementsEvent = Blockly.JavaScript.statementToCode(block, 'Event')
  console.log(dropdownName, statementsEvent)
}

Blockly.JavaScript.move = function (block) {
  const dropdownMove = block.getFieldValue('Move')
  return 'robot.move(' + '"' + dropdownMove + '"' + ')\n'
}

Blockly.JavaScript.rotate = function (block) {
  const dropdownDirection = block.getFieldValue('Direction')
  return 'robot.rotate(' + '"' + dropdownDirection + '"' + ')\n'
}

Blockly.JavaScript.place_marker = function (block) {
  return 'robot.placeMarker()\n'
}

Blockly.JavaScript.collect_resource = function (block) {
  return 'robot.collectResource()\n'
}

Blockly.JavaScript.move_to = function(block) {
  const xPos = block.getFieldValue('XPOS')
  const yPos = block.getFieldValue('YPOS')
  return `robot.moveTo(${xPos}, ${yPos})`
}
