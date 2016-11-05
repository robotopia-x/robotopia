Blockly.JavaScript.move = function (block) {
  var dropdownMove = block.getFieldValue('Move')
  return 'moveInDir(' + '"' + dropdownMove + '"' + ')\n'
}

function moveInDir (dir) {
  switch (dir) {
    case 'LEFT':
      console.log('move left')
      break
    case 'RIGHT':
      console.log('move right')
      break
    case 'UP':
      console.log('move up')
      break
    case 'DOWN':
      console.log('move down')
      break
  }
}

Blockly.JavaScript.rotate = function (block) {
  var dropdownDirection = block.getFieldValue('Direction')
  return 'rotateInDir(' + '"' + dropdownDirection + '"' + ')\n'
}

function rotateInDir (dir) {
  switch (dir) {
    case 'LEFT':
      console.log('rotate left')
      break
    case 'RIGHT':
      console.log('rotate right')
      break
  }
}
