const tutorials = []

addTutorialRow('Blockly', [
  require('./A-blockly01'),
  require('./A-blockly02')
])

addTutorialRow('Rotate', [
  require('./B-rotate-01'),
  require('./B-rotate-02')
])

addTutorialRow('Loops', [
  require('./C-Loop01'),
  require('./C-Loop02'),
  require('./C-Loop03'),
  require('./C-Loop04')
])

addTutorialRow('If-Conditions', [
  require('./D-If-Conditions01'),
  require('./D-If-Conditions02')
])

addTutorialRow('Resources', [
  require('./E-resource-01.js'),
  require('./E-resource-02.js')
])

addTutorialRow('Marker', [
  require('./M-marker-01.js'),
  require('./M-marker-02.js')
])

addTutorialRow('Scout', [
  require('./G-scout-01.js')
])

module.exports = tutorials

function addTutorialRow (categoryName, levels) {
  let row = {
    categoryName: categoryName,
    levels: levels
  }
  tutorials.push(row)
}
