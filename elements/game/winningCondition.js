const html = require('choo/html')
const sf = require('sheetify')

const winPrefix = sf`
  :host {
    position: absolute;
    left: 10%;
    top: 10%;
    background-color: #404040;
    color: white;
    width: 80%;
    height: 80%;
    z-index: 100;
    display: block;
  }
  
  :host > .modalContent {
    margin: 25px;
    background-color: #FFFFFF;
    color: #404040;
  }
`

const goalPrefix = sf`
  :host {
    position: absolute;
    left: 80%;
    top: 0;
    height: 1%;
    width: 20%;
    background-color: grey;
    color: transparent;
  }
  
  :host:hover {
    height: 15%;
    color: #404040;
  }
  
  :host .modalContent {
    margin: 25px;
  }
`

const winningCondition = (state, send) => {
  const robot = state.game.current.entities.ROBOT
  const level = state.level

  if (robot.position.x === 0 && robot.position.y === 3) {
    return html`
    <div class="${winPrefix}">
      <div class="modalContent">
        <h1>Your content here!</h1>  
        <button onclick=${() => send('nextLevel')}>Next Level</button>
      </div>
    </div>
  `
  }

  return html`
    <div class="${goalPrefix}">
      <div class="modalContent">
        <h4>Level: ${level.level + 1}</h4>
        <p>Collect 4 Gems</p>
      </div>
    </div>
  `
}

module.exports = winningCondition
