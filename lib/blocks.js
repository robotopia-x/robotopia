/* global Blockly */

Blockly.Blocks.move = {
  init: function () {
    this.appendDummyInput()
      .appendField('Move')
      .appendField(
        new Blockly.FieldDropdown([
          ['Forward', 'FORWARD'],
          ['Left', 'LEFT'],
          ['Backward', 'BACKWARD'],
          ['Right', 'RIGHT']
        ]), 'Move')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(240)
  }
}

Blockly.Blocks.rotate = {
  init: function () {
    this.appendDummyInput()
      .appendField('Rotate')
      .appendField(new Blockly.FieldDropdown([
        ['Left', 'LEFT'],
        ['Right', 'RIGHT']
      ]), 'Direction')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(240)
  }
}

Blockly.Blocks.place_marker = {
  init: function () {
    this.appendDummyInput()
      .appendField('Place Marker')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(50)
  }
}

Blockly.Blocks.collect_resource = {
  init: function () {
    this.appendDummyInput()
      .appendField('Collect Resource')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(50)
  }
}
