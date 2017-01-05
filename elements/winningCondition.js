const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')
const levels = require('../models/game/levels')
const { getGameState, getEntity } = require('../lib/utils/game')

const winPrefix = sf`
  :host {
    position: absolute;
    left: 10%;
    top: 10%;
    color: white;
    width: 80%;
    height: 80%;
    z-index: 100;
    display: block;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #FFFFFF;
    color: #404040;
    text-align: center;
    overflow: scroll;
    border: 10px solid #404040;
  }
  
  button {
    width: 10%;
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
    overflow: scroll;
    padding: 25px;
  }
`

const winningCondition = (state, send) => {
  const game = getGameState(state.game)
  const level = state.level
  const levelAmount = _.size(levels) - 1

  const goals = getGoals(game, level.goals)

  if (checkAllGoals(game, level.goals)) {

    // TODO move this to another place
    // we shouldn't call send here because
    // rerendering a component shouldn't have a side effect
    send('stopSimulation')

    return html`
    <div class="${winPrefix}">
      <h1>Congratulations on finishing Level ${level.level}</h1>  
      <div class="goals">
        <h2>Goals: </h2>
        ${goals}
      </div>
      ${getNextLevelButton(send, level, levelAmount)}
    </div>
    `
  }

  if (level.displayStory) {
    return html`
    <div class="${winPrefix}">
      <h1>Tutorial - Level ${level.level}</h1> 
      <div class="storyTime">
        <p>Super awesome story here...</p>
        <p>${level.storyModal.text}</p>
        ${level.storyModal.img ? html`<img src="${level.storyModal.img}"/>` : html``}
        <div class="goals">
          <h2>Goals: </h2>
          ${goals}
        </div>
      </div>
      <button onclick=${() => send('level:_setDisplayStoryModal', { displayStory: false })}>Start Tutorial</button>
    </div>
    `
  }

  return html`
    <div class="${goalPrefix}">
      <h4>Level: ${level.level}</h4>
      <div class="goals">
        <h3>Goals: </h3>
        ${goals}
      </div>
    </div>
  `
}

function getNextLevelButton (send, level, levelAmount) {
  if (level.level < levelAmount){
    return html`<button onclick=${() => send('nextLevel')}>Next Level</button>`
  }

  return html`<button onclick=${() => send('location:set', '/')}>Load Editor</button>`
}

function getGoals (game, goals) {
  return _.map(goals, (goal) => html`<p>${checkGoal(goal.type, game, goal.params)} ${goal.desc}</p>`)
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
