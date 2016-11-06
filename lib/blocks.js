/* global Blockly */

Blockly.Blocks['move'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Move')
      .appendField(
        new Blockly.FieldDropdown([
          ['Left', 'LEFT'],
          ['Right', 'RIGHT'],
          ['Up', 'UP'],
          ['Down', 'DOWN']
        ]),
        'Move'
      )
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(240)
  }
}

Blockly.Blocks['rotate'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Rotate')
      .appendField(new Blockly.FieldDropdown([['Left', 'LEFT'], ['Right', 'RIGHT']]), 'Direction')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(240)
  }
}
