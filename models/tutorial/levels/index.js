const simpleMoveTutorial = require('./01-simple-move')
const simpleLoopsTutorial = require('./02-simple-loops')
const nestedLoops1Tutorial = require('./03-nested-loops-1')
const nestedLoops2Tutorial = require('./04-nested-loops-2')
const moveToTutorial = require('./05-move-to')
const collectResourceTutorial = require('./06-collect-resource')
const depositResourceTutorial = require('./07-deposit-resource')
const collect5ResourcesTutorial = require('./08-collect-5-resources')

module.exports = {
  'simple-move': simpleMoveTutorial,
  'simple-loops': simpleLoopsTutorial,
  'nested-loops-1': nestedLoops1Tutorial,
  'nested-loops-2': nestedLoops2Tutorial,
  'move-to': moveToTutorial,
  'collect-resource': collectResourceTutorial,
  'deposit-resource': depositResourceTutorial,
  'collect-5-resources': collect5ResourcesTutorial
}
