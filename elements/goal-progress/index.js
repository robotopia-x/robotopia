const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const classNames = require('classnames')
const { checkGoal } = require('./goal-evaluator')

const goalPrefix = sf`
  :host {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #DDDDDD;
    color: #404040;
    background-color: rgba(221,221,221,0.85);
    color: #404040;
    margin: 20px;
    padding: 25px;
    border-radius: 3px;
  }

  :host > h2 {
    font-size: 1.2em;
    margin: 0;
  }
`

const goalListPrefix = sf`
  :host {
    padding: 0;
  }
  
  :host > .goal {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  :host > .goal:before {
    content: '';
    width: 25px;
    height: 25px;
    background-size: 25px;
    margin-right: 7px;
    background-image: url('assets/icons/checkbox-empty.svg');
  }
  
  :host > .goal.completed:before {  
    background-size: 25px;
    background-image: url('assets/icons/checkbox-filled.svg');
  }
`

function goalProgressView ({ display, game, goals, workspace }) {
  if (display) {
    const [mandatoryGoals, optionalGoals] = _.partition(goals, (goal) => goal.isMandatory)

    return html`
    <div class="${goalPrefix}">
        <h2>Goals: </h2>
        ${goalListView({ goals: mandatoryGoals, game, workspace })}
      
        <h2 style="${optionalGoals.length === 0 ? 'display: none' : ''}">Bonus: </h2>
        ${goalListView({ goals: optionalGoals, game, workspace })}
    </div>
    `
  }
}

function goalListView ({ goals, game, workspace }) {
  if (goals.length === 0) return;

  const goalsHtml = _.map(goals, (goal) => {
    const className = classNames('goal', {
      'completed': checkGoal({ goal, workspace, game })
    })

    return html`
      <li class="${className}"><span>${goal.desc}</span></li>
    `
  })

  return html`
    <ul class="${goalListPrefix}">${goalsHtml}</ul>
  `
}

module.exports = {
  goalListView,
  goalProgressView
}
