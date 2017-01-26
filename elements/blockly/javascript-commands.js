/* global Blockly */

/* MATH */

Blockly.JavaScript.random_number = function (block) {
  const min = block.getFieldValue('min')
  const max = block.getFieldValue('max')

  const code = `getRandomNumber(${min}, ${max})`
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
}

Blockly.JavaScript.random_number_ext = function (block) {
  const min = Blockly.JavaScript.valueToCode(block, 'min', Blockly.JavaScript.ORDER_ATOMIC)
  const max = Blockly.JavaScript.valueToCode(block, 'max', Blockly.JavaScript.ORDER_ATOMIC)

  const code = `getRandomNumber(${min}, ${max})`
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
}

/* MOVE */

Blockly.JavaScript.move = function (block) {
  const dropdownMove = block.getFieldValue('move')
  return 'robot.move(' + '"' + dropdownMove + '"' + ')\n'
}

Blockly.JavaScript.rotate = function (block) {
  const dropdownDirection = block.getFieldValue('direction')
  return 'robot.rotate(' + '"' + dropdownDirection + '"' + ')\n'
}

Blockly.JavaScript.move_to = function (block) {
  const xPos = block.getFieldValue('x')
  const yPos = block.getFieldValue('y')

  return `robot.moveTo(${xPos}, ${yPos})\n`
}

Blockly.JavaScript.move_to_ext = function (block) {
  const xPos = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC)
  const yPos = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC)

  return `robot.moveTo(${xPos}, ${yPos})\n`
}

Blockly.JavaScript.move_to_entity = function (block) {
  const entity = block.getFieldValue('entity')

  return `robot.moveTo(${entity}.x, ${entity}.y)`
}

/* ACTIONS */

Blockly.JavaScript.collect_resource = function (block) {
  return 'robot.collectResource()\n'
}

Blockly.JavaScript.deposit_resource = function (block) {
  return 'robot.depositResource()\n'
}

Blockly.JavaScript.build_tower = function (block) {
  return 'robot.buildTowerNearPosition()\n'
}

Blockly.JavaScript.place_marker_ext = function (block) {
  const type = block.getFieldValue('type')
  const numberOfRobots = block.getFieldValue('numberOfRobots')

  return `robot.placeMarker('${type}', ${numberOfRobots})\n`
}

Blockly.JavaScript.place_marker = function (block) {
  const type = block.getFieldValue('type')
  const numberOfRobots = Blockly.JavaScript.valueToCode(block, 'numberOfRobots', Blockly.JavaScript.ORDER_ATOMIC)

  return `robot.placeMarker('${type}', ${numberOfRobots})\n`
}

/* EVENTS */

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

