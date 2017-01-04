/* global Blockly */
Blockly.Blocks.event_logic = {
  init: function () {
    this.appendDummyInput()
      .appendField('Event')
      .appendField(new Blockly.FieldDropdown([['Marker', 'Marker'], ['Enemy', 'Enemy'], ['Friend', 'Friend']]), 'NAME')
    this.appendStatementInput('NAME')
      .setCheck(null)
    this.setColour(20)
    this.setTooltip('Events execution context')
  }
}

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
    this.setTooltip('Moves the robot in the given direction.')
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
    this.setTooltip('Rotates the robot in the given direction.')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(240)
  }
}

Blockly.Blocks.place_marker = {
  init: function () {
    this.appendDummyInput()
      .appendField('Place Marker')
    this.setTooltip('Places a marker that triggers an event on robots near the marker.')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(50)
  }
}

Blockly.Blocks.collect_resource = {
  init: function () {
    this.appendDummyInput()
      .appendField('Collect Resource')
    this.setTooltip('Collects the resource on the the robots position.')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(50)
  }
}

Blockly.Blocks.move_to = {
  init: function () {
    this.appendDummyInput()
      .appendField('Move to')
    this.appendValueInput('moveX')
      .setCheck(null)
      .appendField('x:')
    this.appendValueInput('moveY')
      .setCheck(null)
      .appendField('y:')
    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setTooltip('Moves the robot to position x, y on the gamefield')
    this.setColour(230)
  }
}

Blockly.Blocks.marker = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['Marker.x', 'entity.position.x'], ['Marker.y', 'entity.position.y']]), 'Marker')
    this.setOutput(true, null)
    this.setColour(170)
    this.setTooltip('Variable that holds the x or y position of the marker')
  }
}