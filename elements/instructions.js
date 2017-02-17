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
  
  :host > .instructImg {
    width: 100%;
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
    width: 50%;
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
    const instructions = level.instructions

    let hintHtml
    let instructionHtml

    if (story.hint) {
      hintHtml = html`
          <p class="story-hint">
            ${story.hint}
          </p>
        `
    }

    if (instructions) {
      instructionHtml = html`<ul class="instructionList">${_.map(instructions.desc, 
        instruction => html`<li>- ${instruction}</li>`)}</ul>`
    }

    return html`
      <div class="${prefix}">
        <h1>${level.label}</h1>
        <p>${hintHtml}</p>
        <div class="instructContainer">
          <h3 class="instructionHeading">Instructions:</h3>
          ${instructionHtml}
        </div>
        ${instructions.img ? html`<img src="${instructions.img}" class="instructImg">` : html``}
      </div>
    `
  }
}

module.exports = {
  instructionView
}
