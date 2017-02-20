/* global Blockly */
const entityOptions = [
  ['base', 'robot.getBasePosition()']
]

Blockly.Blocks.base_position_x = {
  init: function () {
    this.appendDummyInput()
      .appendField('x position of')
      .appendField(new Blockly.FieldDropdown(entityOptions), 'entity')

    this.setOutput(true, null)
    this.setColour(170)
    this.setTooltip('x-position of the base')
  }
}

Blockly.Blocks.base_position_y = {
  init: function () {
    this.appendDummyInput()
      .appendField('y position of')
      .appendField(new Blockly.FieldDropdown(entityOptions), 'entity')

    this.setOutput(true, null)
    this.setColour(170)
    this.setTooltip('y-position of the base')
  }
}
