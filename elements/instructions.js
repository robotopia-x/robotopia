const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')

const prefix = sf`
  :host {
    height: 100%;
    width: 100%;
    padding: 25px;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  
  :host > .rick {
    width: 50%;
    height: 30%;
    background: url('assets/img/rick-avatar.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  :host > .instructContainer > .instructionList {
    list-style-type:none;
    font-size: 1.2em;
  }
  
  :host > .instructContainer > .instructionHeading {
    margin-top: 50px;
  }
  
  :host > .instructContainer > .instructionList > li {
    padding-bottom: 10px;
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

function instructionView ({ level }) {
  if (level) {
    const story = level.storyModal
    let hintHtml
    let instructionHtml

    if (story.hint) {
      hintHtml = html`
          <p class="story-hint">
            ${story.hint}
          </p>
        `
    }

    if (level.instructions) {
      instructionHtml = html`<ul class="instructionList">${_.map(level.instructions, 
        instruction => html`<li>- ${instruction}</li>`)}</ul>`
    }

    return html`
      <div class="${prefix}">
        <h1>${level.label}</h1>
        <div class="rick"></div>
        <div class="instructContainer">
          <h3 class="instructionHeading">Instructions:</h3>
          ${instructionHtml}
        </div>
        <p>${hintHtml}</p>
      </div>
    `
  }
}

module.exports = {
  instructionView
}
