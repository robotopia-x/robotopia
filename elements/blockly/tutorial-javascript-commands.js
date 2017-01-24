/* global Blockly */
Blockly.JavaScript.base_position_x = function (block) {
  const position = block.getFieldValue('entity')
  return [`${position}.x`, Blockly.JavaScript.ORDER_NONE]
}

Blockly.JavaScript.base_position_y = function (block) {
  const position = block.getFieldValue('entity')
  return [`${position}.y`, Blockly.JavaScript.ORDER_NONE]
}
