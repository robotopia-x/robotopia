function createGrid (xTiles, yTiles) {
  let gameGrid = []

  for (let i = 0; i < yTiles; i++) {
    let row = []
    for (let j = 0; j < xTiles; j++) {
      row.push(0)
    }
    gameGrid.push(row)
  }
  return gameGrid
}

function drawGrid (state, ctx, cWidth, cHeight) {
  const gameGrid = state.gameGrid

  const tileWidth = cWidth / gameGrid[0].length
  const tileHeight = cHeight / gameGrid.length

  let xStart = 0
  let yStart = 0

  for (let i = 0; i < gameGrid.length; i++) {
    for (let j = 0; j < gameGrid[i].length; j++) {
      ctx.fillStyle = getRandomColor()
      ctx.fillRect(xStart, yStart, tileWidth, tileHeight)
      xStart += tileWidth
    }
    xStart = 0
    yStart += tileHeight
  }
}

module.exports = {
  createGrid,
  drawGrid
}

function getRandomColor () {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
