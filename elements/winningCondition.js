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
    padding: 25px;
  }
  
  :host > .modalContent {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #FFFFFF;
    color: #404040;
    height: 100%;
    text-align: center;
  }
  
  button {
    width: 10%;
  }
  
  h1 {
    margin: 0;
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
    transition: height 0.25s, color 0.2s;
    transition-timing-function: ease-in-out;
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


  //TODO if all goals are met -> level finished
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

  //TODO display a img of what has to be done in the level
  if (level.displayStory) {
    return html`
    <div class="${winPrefix}">
      <div class="modalContent">
        <h1>Tutorial - Level ${level.level + 1}</h1> 
        <div class="storyTime">
          <p>Super awesome story here...</p>
          <p>${level.storyText}</p>
          <p>IMG with the task described will be here...</p>
        </div>
        <button onclick=${() => send('level:closeStoryModal')}>Start Tutorial</button>
      </div>
    </div>
    `
  }

  //TODO each goal needs to be checked and either ticked or x-ed
  return html`
    <div class="${goalPrefix}">
      <div class="modalContent">
        <h4>Level: ${level.level + 1}</h4>
        ${getGoals(level.goals)}
      </div>
    </div>
  `
}

function getGoals (goals) {
  return _.reduce(goals, (goal, value, key) => {
    goal.push(html`<p>${'X'} ${key}: ${value}</p>`)
    return goal
  }, [])
}

module.exports = winningCondition
