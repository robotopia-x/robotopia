/* global Blockly */
Blockly.JavaScript.marker_event_handler = function (block) {
  const type = block.getFieldValue('type')
  const statements = Blockly.JavaScript.statementToCode(block, 'body')

  return (
    `robot.onMode('${type}', function (marker) {
${statements}
})\n`)
}

Blockly.JavaScript.resource_event_handler = function (block) {
  const statements = Blockly.JavaScript.statementToCode(block, 'body')

  return (
    `robot.onEvent('discover resource', function (resource) {
${statements}
})\n`)
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
  const type = block.getFieldValue('type')
  const numberOfRobots = Blockly.JavaScript.valueToCode(block, 'numberOfRobots', Blockly.JavaScript.ORDER_ATOMIC)

  return `robot.placeMarker('${type}', ${numberOfRobots})\n`
}

Blockly.JavaScript.build_tower = function (block) {
  return 'robot.buildTowerNearPosition()\n'
}

Blockly.JavaScript.collect_resource = function (block) {
  return 'robot.collectResource()\n'
}

Blockly.JavaScript.deposit_resource = function (block) {
  return 'robot.depositResource()\n'
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

Blockly.JavaScript.random_number = function (block) {
  const min = Blockly.JavaScript.valueToCode(block, 'MIN', Blockly.JavaScript.ORDER_ATOMIC)
  const max = Blockly.JavaScript.valueToCode(block, 'MAX', Blockly.JavaScript.ORDER_ATOMIC)

  const code = `getRandomNumber(${min}, ${max})`
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
}
