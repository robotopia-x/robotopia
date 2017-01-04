const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')

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
    height: 50px;
    width: 20%;
    background-color: #DDDDDD;
    color: transparent;
  }
  
  :host:hover {
    height: 20%;
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
        <h1>Congratulations on finishing Level ${level.level + 1}</h1>  
        <button onclick=${() => send('nextLevel')}>Next Level</button>
      </div>
    </div>
    `
  }

  if (level.story) {
    return html`
    <div class="${winPrefix}">
      <div class="modalContent">
        <h1>StoryBlabla Level ${level.level + 1}</h1> 
        <p>Super awesome story here</p>
        <button onclick=${() => send('level:closeStory')}>Start Tutorial</button>
      </div>
    </div>
    `
  }

  return html`
    <div class="${goalPrefix}">
      <div class="modalContent">
        <h4>Level: ${level.level + 1}</h4>
        <ul>${getGoals(level.goals)}</ul>
      </div>
    </div>
  `
}

function getGoals (goals) {
  let goalString = ``

  _.forEach(goals, (goal, key) => {
    goalString += `<p>${'X'} ${key}: ${goal}</p>`
  })

  return goalString
}

module.exports = winningCondition
