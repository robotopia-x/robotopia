const tutorials = []

addTutorialRow('blockly', [
  require('./A-blockly01.js')
])

addTutorialRow('rotate', [
  require('./B-rotate-01.js'),
  require('./B-rotate-02.js')
])

addTutorialRow('loop', [
  require('./C-Loop01.js'),
  require('./C-Loop02.js'),
  require('./C-Loop03.js')
])

addTutorialRow('resource', [
  require('./E-resource-01.js'),
  require('./E-resource-02.js')
])

addTutorialRow('marker', [
  require('./M-marker-01.js'),
  require('./M-marker-02.js')
])

module.exports = tutorials

function addTutorialRow (categoryName, levels) {
  let row = {
    categoryName: categoryName,
    levels: levels
  }
  tutorials.push(row)
}
