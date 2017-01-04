const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')
const { getGameState, getEntity } = require('../lib/utils/game')

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
  
  img {
    width: 50%;
  }
`

const goalPrefix = sf`
  :host {
    position: absolute;
    left: 80%;
    top: 0;
    height: 20%;
    width: 20%;
    background-color: #DDDDDD;
    color: #404040;
  }
  
  :host .modalContent {
    margin: 25px;
  }
`

const winningCondition = (state, send) => {
  const game = getGameState(state.game)
  const level = state.level

  const goals = getGoals(game, level.goals)

  if (checkAllGoals(game, level.goals)) {
    return html`
    <div class="${winPrefix}">
      <div class="modalContent">
        <h1>Congratulations on finishing Level ${level.level + 1}</h1>  
        <div class="goals">
          <h2>Goals: </h2>
          ${goals}
        </div>
        <button onclick=${() => send('nextLevel')}>Next Level</button>
      </div>
    </div>
    `
  }

  if (level.displayStory) {
    return html`
    <div class="${winPrefix}">
      <div class="modalContent">
        <h1>Tutorial - Level ${level.level + 1}</h1> 
        <div class="storyTime">
          <p>Super awesome story here...</p>
          <p>${level.storyModal.text}</p>
          <img src="${level.storyModal.img}"/>
          <div class="goals">
            <h2>Goals: </h2>
            ${goals}
          </div>
        </div>
        <button onclick=${() => send('level:closeStoryModal')}>Start Tutorial</button>
      </div>
    </div>
    `
  }

  return html`
    <div class="${goalPrefix}">
      <div class="modalContent">
        <h4>Level: ${level.level + 1}</h4>
        <div class="goals">
          <h3>Goals: </h3>
          ${goals}
        </div>
      </div>
    </div>
  `
}

function getGoals (game, goals) {
  return _.reduce(goals, (goal, value) => {
    goal.push(html`<p>${checkGoal(value.type, game, value.params)} ${value.desc}</p>`)
    return goal
  }, [])
}

function checkAllGoals (game, goals) {
  return _.every(goals, (goal) => checkGoal(goal.type, game, goal.params))
}

function checkGoal (type, game, params) {
  if (type === 'moveTo') {
    const entity = getEntity(params.entity, game)
    const entityPos = { x: entity.position.x, y: entity.position.y }

    return _.isEqual(entityPos, params.position)
  }

  if (type === 'collectResource') {
    return true
  }
}

module.exports = winningCondition
