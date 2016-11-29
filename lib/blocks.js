/* global Blockly */

Blockly.Blocks['move'] = {
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
Blockly.Blocks['rotate'] = {
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

Blockly.Blocks['goto'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Go to')
      .appendField(new Blockly.FieldDropdown([['Factory', 'FACTORY'], ['Resources', 'RESOURCE'], ['Gem', 'GEM']]), 'location')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(210)
    this.setTooltip('')
    this.setHelpUrl('http://www.example.com/')
  }
};
