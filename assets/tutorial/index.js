const tutorials = []

addTutorialRow('Blockly', [
  require('./a-blockly-01'),
  require('./a-blockly-02')
])

addTutorialRow('Rotate', [
  require('./b-rotate-01'),
  require('./b-rotate-02')
])

addTutorialRow('Loops', [
  require('./c-loop-01'),
  require('./c-loop-02'),
  require('./c-loop-03')
])

addTutorialRow('Conditions', [
  require('./d-conditions-01'),
  require('./d-conditions-02')
])

addTutorialRow('Resources', [
  require('./e-resource-01.js'),
  require('./e-resource-02.js')
])

addTutorialRow('Marker', [
  require('./f-marker-01.js'),
  require('./f-marker-02.js')
])

addTutorialRow('Scout', [
  require('./g-scout-01.js')
])

function addTutorialRow (categoryName, levels) {
  let row = {
    categoryName: categoryName,
    levels: levels
  }
  tutorials.push(row)
}

module.exports = tutorials
