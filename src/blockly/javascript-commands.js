/* global Blockly */
Blockly.JavaScript.event_logic = function (block) {
  const dropdownName = block.getFieldValue('NAME')
  const statementsEvent = Blockly.JavaScript.statementToCode(block, 'NAME')

  return `
    robot.onCreate${dropdownName} = function (entity) {
      ${statementsEvent}
    }`
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

Blockly.JavaScript.move_to = function (block) {
  const xPos = Blockly.JavaScript.valueToCode(block, 'moveX', Blockly.JavaScript.ORDER_ATOMIC)
  const yPos = Blockly.JavaScript.valueToCode(block, 'moveY', Blockly.JavaScript.ORDER_ATOMIC)

  return `robot.moveTo(${xPos}, ${yPos})`
}

Blockly.JavaScript.marker = function (block) {
  return [block.getFieldValue('Marker'), Blockly.JavaScript.ORDER_NONE]
}
