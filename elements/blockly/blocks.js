const _ = require('lodash')
const {
  LOGIC_COLOR,
  LOOPS_COLOR,
  MATH_COLOR,
  ACTION_COLOR,
  EVENT_COLOR,
  MOVEMENT_COLOR,
} = require('./colors')

/* global Blockly */
// adds the bow on top of event blocks
Blockly.BlockSvg.START_HAT = true

// Defines saturation and lightness
// of the given block colors
Blockly.HSV_SATURATION = 0.7
Blockly.HSV_VALUE = 0.75

function disableBlockIfNotConnected (block) {
  const parent = block.getParent()

  // ignore blocks which are inside of toolbar
  if (block.isInFlyout) {
    return
  }

  if (parent === null && block.disabled === false) {
    block.setDisabled(true)
    return
  }

  if (parent !== null && block.disabled === true) {
    block.setDisabled(false)
  }
}

function overrideColor (blockName, color) {
  const block = Blockly.Blocks[blockName]
  const _init = block.init

  block.init = function () {
    _init.call(this)
    this.setColour(color)
  }
}

overrideColor('controls_if', LOGIC_COLOR)
overrideColor('logic_boolean', LOGIC_COLOR)
overrideColor('logic_negate', LOGIC_COLOR)
overrideColor('logic_compare', LOGIC_COLOR)

overrideColor('controls_repeat', LOOPS_COLOR)
overrideColor('controls_repeat_ext', LOOPS_COLOR)
overrideColor('controls_whileUntil', LOOPS_COLOR)

overrideColor('math_number', MATH_COLOR)
overrideColor('math_arithmetic', MATH_COLOR)

/* add onchange handler to existing blocks */
_.forEach([
  'logic_boolean', 'logic_negate', 'logic_compare',
  'controls_if', 'controls_repeat', 'controls_repeat_ext', 'controls_whileUntil',
  'math_number', 'math_arithmetic'
], (blockName) => {
  Blockly.Blocks[blockName].onchange = function () {
    disableBlockIfNotConnected(this)
  }
})

/* MATH */

Blockly.Blocks.random_number_ext = {
  init () {
    this.appendDummyInput()
      .appendField('Random between')

    this.appendValueInput('min')
      .setCheck('Number')

    this.appendValueInput('max')
      .setCheck('Number')
      .appendField('and')

    this.setInputsInline(true)
    this.setOutput(true, 'Number')
    this.setColour(MATH_COLOR)
    this.setTooltip('generates a random number between min and max')
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.random_number = {
  init () {
    this.appendDummyInput()
      .appendField('Random between')
      .appendField(new Blockly.FieldNumber(1), 'min')
      .appendField('and')
      .appendField(new Blockly.FieldNumber(5), 'max')

    this.setInputsInline(true)
    this.setOutput(true, 'Number')
    this.setColour(MATH_COLOR)
    this.setTooltip('generates a random number between min and max')
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

/* MOVE */

Blockly.Blocks.move = {
  init () {
    this.appendDummyInput()
      .appendField('Move')
      .appendField(
        new Blockly.FieldDropdown([
          ['⇧ Forward ', 'FORWARD'],
          ['⇦ Left', 'LEFT'],
          ['⇩ Backward', 'BACKWARD'],
          ['⇨ Right', 'RIGHT']
        ]),
        'move'
      )

    this.setTooltip('move the robot in the given direction')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(MOVEMENT_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.rotate = {
  init () {
    this.appendDummyInput()
      .appendField('Rotate')
      .appendField(new Blockly.FieldDropdown([
        ['↺ Left', 'LEFT'],
        ['↻ Right', 'RIGHT']
      ]), 'direction')

    this.setTooltip('rotate the robot in the given direction')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(MOVEMENT_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.move_to = {
  init () {
    this.appendDummyInput()
      .appendField('Move to  x:')
      .appendField(new Blockly.FieldNumber(0), 'x')
      .appendField(' y:')
      .appendField(new Blockly.FieldNumber(0), 'y')

    this.setInputsInline(true)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setTooltip('move the robot to position x, y on the game field')
    this.setColour(MOVEMENT_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.move_to_ext = {
  init () {
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
    this.setColour(MOVEMENT_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.move_to_entity = {
  init () {
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
    this.setColour(MOVEMENT_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

/* ACTIONS */

Blockly.Blocks.collect_resource = {
  init () {
    this.appendDummyInput()
      .appendField('Collect resource')

    this.setTooltip('collect a resource on the the robots positions')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(ACTION_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.deposit_resource = {
  init () {
    this.appendDummyInput()
      .appendField('Deposit resource')

    this.setTooltip('deposits a resource if robot is on home base')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(ACTION_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.collected_resources = {
  init () {
    this.appendDummyInput()
      .appendField('Collected resources')

    this.setTooltip('number of resources which are currently available')
    this.setColour(ACTION_COLOR)
    this.setOutput(true, 'Number')
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.build_tower = {
  init () {
    this.appendDummyInput()
      .appendField('Build tower')

    this.setTooltip('build a tower in front of the robot')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(ACTION_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.place_marker = {
  init () {
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
    this.setColour(ACTION_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

Blockly.Blocks.place_marker_ext = {
  init () {
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
    this.setColour(ACTION_COLOR)
  },

  onchange () {
    disableBlockIfNotConnected(this)
  }
}

/* EVENTS */

Blockly.Blocks.start_handler = {
  init () {
    this.appendDummyInput()
      .appendField('when start')

    this.appendStatementInput('body')
      .setCheck(null)

    this.setColour(EVENT_COLOR)
    this.setTooltip('code which is executed when programm starts')
  }
}

Blockly.Blocks.marker_event_handler = {
  init () {
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

    this.setColour(EVENT_COLOR)
    this.setTooltip('code which is executed when an marker is assigned')

    // mark block as event handler, we use blockly data string
    // unfortunately only string are allowed (https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks#block_data_web_only)
    this.data = 'EVENT_HANDLER'
  }
}

Blockly.Blocks.resource_event_handler = {
  init () {
    this.appendDummyInput()
      .appendField('when resource is discovered')

    this.appendStatementInput('body')
      .setCheck(null)

    this.setColour(EVENT_COLOR)
    this.setTooltip('code which is executed when a new resource is discovered')

    // mark block as event handler
    this.data = 'EVENT_HANDLER'
  }
}
