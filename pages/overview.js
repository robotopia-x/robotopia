const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')
const tutorials = require('../models/tutorial/levels')
const buttonView = require('../elements/button')

const prefix = sf`
  :host {
    color: #404040;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  :host div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 25px;
  } 
  
  :host ol {
    padding-top: 0;
    margin-top: 0;
  }
  
  li {
    font-size: 1.5em;
  }
  
  :host a {
    color: #404040;
  }
  
  :host a:hover {
    color: #dddddd;
  }
`

const overviewView = (state, prev, send) => {
  const tutorialLinks = getAllTutorialRoutes()
  const editorButton = buttonView({
    label: 'Load Editor',
    onClick: () => send('location:set', '/#editor')
  })

  return html`
    <div class="${prefix}">
      <div class="tutorials">
        <h2>Tutorials:</h2>
        ${tutorialLinks}
      </div>
      <div class="editor">
        <h2>Check out the Editor:</h2>
        ${editorButton}
      </div>
    </div>
  `
}

function getAllTutorialRoutes () {
  return html`<ol class="tutorialRoutes">${_.map(tutorials, (tutorial, key) => html`<li><a href="/tutorial/${key}">${key}</a></li>`)}</ol>`
}

module.exports = overviewView
