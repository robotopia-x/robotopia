const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')
const tutorials = require('../assets/tutorial')
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
  
  :host > .logo {
    width: 100%;
    height: 35%;
    background-image: url('assets/icons/robotopia.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 0;
  }
  
  :host h2 {
    color: #03a9f4;
  }
  
  :host ol {
    padding-top: 0;
    margin-top: 0;
  }
  
  li {
    font-size: 1.5em;
    padding: 3px;
  }
  
  :host a {
    color: #404040;
  }
  
  :host a:hover {
    color: #dddddd;
  }
  
  :host > .credits {
    margin-top: 50px;
    text-decoration: underline;
  }
`

const overviewView = (state, prev, send) => {
  const tutorialLinks = getAllTutorials()
  const editorButton = buttonView({
    label: 'Load Editor',
    onClick: () => send('location:set', '#editor')
  })

  return html`
    <div class="${prefix}">
      <div class="logo"></div>
      <div class="tutorials">
        <h2>Tutorials:</h2>
        ${tutorialLinks}
      </div>
      <div class="editor">
        <h2>Check out the Editor:</h2>
        ${editorButton}
      </div>
      <a class="credits" href="#credits">© Credits</a>
    </div>
  `
}

function getAllTutorials () {
  return html`
<ol class="tutorialRoutes">
    ${_.map(tutorials, (tutorial) => html`<li><a href="#tutorial/${tutorial.categoryName}/1">${tutorial.categoryName}</a></li>`)}
</ol>
`
}

module.exports = overviewView
