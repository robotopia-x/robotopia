const html = require('choo/html')
const sf = require('sheetify')
const { goalProgressView } = require('../elements/goal-progress')

const prefix = sf`
  :host {
    height: 100%;
    width: 100%;
    padding: 25px;
    margin: 0;
    display: flex;
    flex-direction: column; 
    align-items: center;
  }
  
  :host .story-hint {
    width: 100%;
    color: #8a6d3b;
    border: 1px solid #faebcc;
    padding: 15px;
    border-radius: 3px;
    padding-left: 50px;
    display: inline-block;
    background-color: #fcf8e3;
    background-image: url('assets/icons/info.svg');
    background-size: 32px 32px;
    background-position: 10px center;
    background-repeat: no-repeat;
  }
`

function instructionView ({ prev }, { level, isStoryModalOpen }) {
  if (level) {
    const story = level.storyModal

    let goalHtml
    let hintHtml

    if (level !== null) {
      goalHtml = goalProgressView({
        display: !isStoryModalOpen,
        game: prev,
        goals: level.goals,
        workspace: level.editor.workspace
      })
    }

    if (story.hint) {
      hintHtml = html`
          <p class="story-hint">
            ${story.hint}
          </p>
        `
    }

    return html`
      <div class="${prefix}">
        <h1>${level.label}</h1>
        <p>${hintHtml}</p>
        ${goalHtml}          
      </div>
    `
  }
}

module.exports = {
  instructionView
}
