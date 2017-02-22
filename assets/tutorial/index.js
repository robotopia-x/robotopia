const tutorials = []

addTutorialRow('blockly', [
  require('./A01-blockly.js')
])

addTutorialRow('turn', [
  require('./B01-turn.js')
])

addTutorialRow('loop', [
  require('./C01-loop.js')
])

addTutorialRow('scout', [
  require('./D01-scout.js')
])

addTutorialRow('resource', [
  require('./E01-resource.js')
])

module.exports = tutorials

function addTutorialRow (categoryName, levels) {
  let row = {
    categoryName: categoryName,
    levels: levels
  }
  tutorials.push(row)
}
