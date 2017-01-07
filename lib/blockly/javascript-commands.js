/* global Blockly */
Blockly.JavaScript.event_logic = function (block) {
  const dropdownName = block.getFieldValue('name')
  const statementsEvent = Blockly.JavaScript.statementToCode(block, 'name')

  return `
    robot.onCreate${dropdownName} = function (entity) {
      ${statementsEvent}
    }\n`
}

Blockly.JavaScript.move = function (block) {
  const dropdownMove = block.getFieldValue('move')
  return 'robot.move(' + '"' + dropdownMove + '"' + ')\n'
}

Blockly.JavaScript.rotate = function (block) {
  const dropdownDirection = block.getFieldValue('direction')
  return 'robot.rotate(' + '"' + dropdownDirection + '"' + ')\n'
}

Blockly.JavaScript.place_marker = function (block) {
  return 'robot.placeMarker()\n'
}

Blockly.JavaScript.build_tower = function (block) {
  return 'robot.buildTowerNearPosition()\n'
}

Blockly.JavaScript.collect_resource = function (block) {
  return 'robot.collectResource()\n'
}

Blockly.JavaScript.move_to = function (block) {
  const xPos = Blockly.JavaScript.valueToCode(block, 'moveX', Blockly.JavaScript.ORDER_ATOMIC)
  const yPos = Blockly.JavaScript.valueToCode(block, 'moveY', Blockly.JavaScript.ORDER_ATOMIC)

  return `robot.moveTo(${xPos}, ${yPos})\n`
}

Blockly.JavaScript.position_x = function (block) {
  const position = block.getFieldValue('entity')
  return [`${position}.x`, Blockly.JavaScript.ORDER_NONE]
}

Blockly.JavaScript.position_y = function (block) {
  const position = block.getFieldValue('entity')
  return [`${position}.y`, Blockly.JavaScript.ORDER_NONE]
}
