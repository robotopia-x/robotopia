/* global Blockly */
// adds the bow on top of event blocks
Blockly.BlockSvg.START_HAT = true

// Defines saturation and lightness
// of the given block colors
Blockly.HSV_SATURATION = 0.7
Blockly.HSV_VALUE = 0.75

/* MATH */

Blockly.Blocks.random_number_ext = {
  init: function () {
    this.appendDummyInput()
      .appendField('Random between')

    this.appendValueInput('min')
      .setCheck('Number')

    this.appendValueInput('max')
      .setCheck('Number')
      .appendField('and')

    this.setInputsInline(true)
    this.setOutput(true, 'Number')
    this.setColour(230)
    this.setTooltip('generates a random number between min and max')
  }
}

Blockly.Blocks.random_number = {
  init: function () {
    this.appendDummyInput()
      .appendField('Random between')
      .appendField(new Blockly.FieldNumber(1), 'min')
      .appendField('and')
      .appendField(new Blockly.FieldNumber(5), 'max')

    this.setInputsInline(true)
    this.setOutput(true, 'Number')
    this.setColour(230)
    this.setTooltip('generates a random number between min and max')
  }
}

/* MOVE */

Blockly.Blocks.move = {
  init: function () {
    this.appendDummyInput()
      .appendField('Move')
      .appendField(
        new Blockly.FieldDropdown([
          ['⇩ Forward ', 'FORWARD'],
          ['⇦ Left', 'LEFT'],
          ['⇧ Backward', 'BACKWARD'],
          ['⇨ Right', 'RIGHT']
        ]),
        'move'
      )

    this.setTooltip('move the robot in the given direction')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(40)
  }
}

Blockly.Blocks.rotate = {
  init: function () {
    this.appendDummyInput()
      .appendField('Rotate')
      .appendField(new Blockly.FieldDropdown([
        ['↺ Left', 'LEFT'],
        ['↻ Right', 'RIGHT']
      ]), 'direction')

    this.setTooltip('rotate the robot in the given direction')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(40)
  }
}

Blockly.Blocks.move_to = {
  init: function () {
    this.appendDummyInput()
      .appendField('Move to  x:')
      .appendField(new Blockly.FieldNumber(0), 'x')
      .appendField(' y:')
      .appendField(new Blockly.FieldNumber(0), 'y')

    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setTooltip('move the robot to position x, y on the game field')
    this.setColour(40)
  }
}

Blockly.Blocks.move_to_ext = {
  init: function () {
    this.appendDummyInput()
      .appendField('Move to')

    this.appendValueInput('x')
      .setCheck(null)
      .appendField('x:')

    this.appendValueInput('y')
      .setCheck(null)
      .appendField('y:')

    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setTooltip('move the robot to position x, y on the game field')
    this.setColour(40)
  }
}

Blockly.Blocks.move_to_entity = {
  init: function () {
    this.appendDummyInput()
      .appendField('Move to')
      .appendField(
        new Blockly.FieldDropdown([
          ['marker', 'marker.position'],
          ['resource', 'resource.position'],
          ['base', 'robot.getBasePosition()']
        ]),
        'entity'
      )

    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setTooltip('move the robot to position of selected entity')
    this.setColour(40)
  }
}

/* ACTIONS */

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

Blockly.Blocks.place_marker = {
  init: function () {
    this.appendDummyInput()
      .appendField('Place')
      .appendField(new Blockly.FieldDropdown([
        ['red', 'red'],
        ['green', 'green'],
        ['blue', 'blue'],
        ['yellow', 'yellow']
      ]), 'type')
      .appendField('marker for')
      .appendField(new Blockly.FieldNumber(2), 'numberOfRobots')
      .appendField('robots')

    this.setInputsInline(true)
    this.setTooltip('place a marker that triggers an event which other robots can react to')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(50)
  }
}

Blockly.Blocks.place_marker_ext = {
  init: function () {
    this.appendDummyInput()
      .appendField('Place')
      .appendField(new Blockly.FieldDropdown([
        ['red', 'red'],
        ['green', 'green'],
        ['blue', 'blue'],
        ['yellow', 'yellow']
      ]), 'type')
      .appendField('marker for')

    this.appendValueInput('numberOfRobots')
      .setCheck('Number')

    this.appendDummyInput()
      .appendField('robots')

    this.setInputsInline(true)
    this.setTooltip('place a marker that triggers an event which other robots can react to')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(50)
  }
}

/* EVENTS */

Blockly.Blocks.start_handler = {
  init: function () {
    this.appendDummyInput()
      .appendField('when start')

    this.appendStatementInput('body')
      .setCheck(null)

    this.set

    this.setColour(20)
    this.setTooltip('code which is executed when programm starts')
  }
}

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
      .appendField('marker is assigned')

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
