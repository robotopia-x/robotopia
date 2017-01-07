/* global Blockly */
Blockly.Blocks.event_logic = {
  init: function () {
    this.appendDummyInput()
      .appendField('Event')
      .appendField(new Blockly.FieldDropdown([['Marker', 'Marker'], ['Enemy', 'Enemy'], ['Friend', 'Friend']]), 'NAME')
    this.appendStatementInput('NAME')
      .setCheck(null)
    this.setColour(20)
    this.setTooltip('code which is executed when an event is triggered')
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
    this.setTooltip('move the robot in the given direction')
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
    this.setTooltip('rotate the robot in the given direction')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(240)
  }
}

Blockly.Blocks.place_marker = {
  init: function () {
    this.appendDummyInput()
      .appendField('Place marker')
    this.setTooltip('place a marker that triggers an event which other robots can react to')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(50)
  }
}

Blockly.Blocks.build_tower = {
  init: function () {
    this.appendDummyInput()
    .appendField('Build tower')
    this.setTooltip('build a tower in front of the robot')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(50)
  }
}

Blockly.Blocks.collect_resource = {
  init: function () {
    this.appendDummyInput()
      .appendField('Collect resource')
    this.setTooltip('collect a resource on the the robots positions')
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
    this.setTooltip('move the robot to position x, y on the game field')
    this.setColour(230)
  }
}

Blockly.Blocks.marker = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['Marker.x', 'entity.position.x'], ['Marker.y', 'entity.position.y']]), 'Marker')
    this.setOutput(true, null)
    this.setColour(170)
    this.setTooltip('position of the marker')
  }
}
