const tutorials = []

addTutorialRow('blockly', [
  require('./A-blockly01'),
  require('./A-blockly02')
])

addTutorialRow('rotate', [
  require('./B-rotate-01'),
  require('./B-rotate-02')
])

addTutorialRow('loop', [
  require('./C-Loop01'),
  require('./C-Loop02'),
  require('./C-Loop03')
])

addTutorialRow('scout', [
  require('./D-scout-01')
])

addTutorialRow('resource', [
  require('./E-resource-01')
])

module.exports = tutorials

function addTutorialRow (categoryName, levels) {
  let row = {
    categoryName: categoryName,
    levels: levels
  }
  tutorials.push(row)
}
