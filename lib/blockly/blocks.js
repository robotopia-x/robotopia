/* global Blockly */

// adds the bow on top of event blocks
Blockly.BlockSvg.START_HAT = true

Blockly.Blocks.marker_placed_event = {
  init: function () {
    this.appendDummyInput()
      .appendField('when marker is placed')
    this.appendStatementInput('body')
      .setCheck(null)
    this.setColour(20)
    this.setTooltip('code which is executed when an marker is placed')
  }
}

Blockly.Blocks.tower_discovered_event = {
  init: function () {
    this.appendDummyInput()
    .appendField('when tower is discovered')
    this.appendStatementInput('body')
    .setCheck(null)
    this.setColour(20)
    this.setTooltip('code which is executed when an tower is discovered')
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
        ]),
        'move'
      )
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
      ]), 'direction')
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

Blockly.Blocks.deposit_resource = {
  init: function () {
    this.appendDummyInput()
      .appendField('Deposit resource')
    this.setTooltip('deposits a resource if robot is on home base')
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
    this.setColour(240)
  }
}

const entityOptions = [
  ['marker', 'entity.position'],
  ['tower', 'entity.position'],
  ['base', 'robot.getBasePosition()']
]

Blockly.Blocks.position_x = {
  init: function () {
    this.appendDummyInput()
      .appendField('x position of')
      .appendField(new Blockly.FieldDropdown(entityOptions), 'entity')
    this.setOutput(true, null)
    this.setColour(170)
    this.setTooltip('x-position of an object')
  }
}

Blockly.Blocks.random_number = {
  init: function () {
    this.appendDummyInput()
      .appendField('Random number')
    this.appendValueInput('MIN')
      .setCheck('Number')
      .appendField('from')
    this.appendValueInput('MAX')
      .setCheck('Number')
      .appendField('to')
    this.setInputsInline(true)
    this.setOutput(true, 'Number')
    this.setColour(230)
    this.setTooltip('generates a random number between value1 and value2')
  }
}

Blockly.Blocks.position_y = {
  init: function () {
    this.appendDummyInput()
    .appendField('y position of')
    .appendField(new Blockly.FieldDropdown(entityOptions), 'entity')
    this.setOutput(true, null)
    this.setColour(170)
    this.setTooltip('y-position of an object')
  }
}
