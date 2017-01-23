/* global Blockly */
// adds the bow on top of event blocks
Blockly.BlockSvg.START_HAT = true

// Defines saturation and lightness
// of the given block colors
Blockly.HSV_SATURATION = 0.6
Blockly.HSV_VALUE = 0.75

Blockly.Blocks.marker_event_handler = {
  init: function () {
    this.appendDummyInput()
      .appendField('when')
      .appendField(
        new Blockly.FieldDropdown([
          ['red', 'red'],
          ['green', 'green'],
          ['blue', 'blue'],
          ['yellow', 'yellow']
        ]),
        'type'
      )
      .appendField('mode')

    this.appendStatementInput('body')
      .setCheck(null)

    this.setColour(20)
    this.setTooltip('code which is executed when an marker is assigned')

    // mark block as event handler, we use blockly data string
    // unfortunately only string are allowed (https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_data_web_only)
    this.data = 'EVENT_HANDLER'
  }
}

Blockly.Blocks.resource_event_handler = {
  init: function () {
    this.appendDummyInput()
      .appendField('when resource is discovered')

    this.appendStatementInput('body')
      .setCheck(null)

    this.setColour(20)
    this.setTooltip('code which is executed when a new resource is discovered')

    // mark block as event handler
    this.data = 'EVENT_HANDLER'
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
      .appendField('Place')
      .appendField(new Blockly.FieldDropdown([
        ['red marker', 'red'],
        ['green marker', 'green'],
        ['blue marker', 'blue'],
        ['yellow marker', 'yellow']
      ]), 'type')

    this.appendValueInput('numberOfRobots')
      .setCheck(null)

    this.setInputsInline(true)
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
  ['marker', 'marker.position'],
  ['resource', 'resource.position'],
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
