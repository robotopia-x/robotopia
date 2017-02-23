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
    overflow-y: scroll;
  }
  
  :host > div {
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
    text-align: center;
  }
  
  :host .editor {
    text-align: center;
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
  
  :host .category {
    width: 95%;
    border-bottom: 1px solid black;
    margin: 20px auto;
  }
  
  :host .name {
    text-align: left;
    font-size: 150%;
    font-weight: 600;
  }
  
  :host .level {
    width: 256px;
    height: 256px;
    overflow: hidden;
    display: inline-block;
    margin: 20px;
    position: relative;
  }
  
  :host .level > div {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
  }
`

const overviewView = (state, prev, send) => {
  const editorButton = buttonView({
    label: 'Load Editor',
    onClick: () => send('location:set', '#editor')
  })

  return html`
    <div class="${prefix}">
      <div class="logo"></div>
      <div class="tutorials">
        <h2>Tutorials:</h2>
        ${getAllTutorials(tutorials)}
      </div>
      <div class="editor">
        <h2>Check out the Editor:</h2>
        ${editorButton}
      </div>
      <a class="credits" href="#credits">© Credits</a>
    </div>
  `
}

function getAllTutorials (tutorials) {
  return html`
<div class="tutorials">
    ${_.map(tutorials, getTutorialCategory)}
</div>
`

  function getTutorialCategory(category) {
    const name = category.categoryName
    return html`
      <div class="category">
        <div class="name">${name}</div>
        ${_.map(category.levels, getTutorial)}
      </div>
`

    function getTutorial(level, index) {
      return html`
      <a href="#tutorial/${name}/${index + 1}" class="level">
        <div style="background-image: url('assets/tutorial/levelImages/${name}${index + 1}.png');">
        
        </div>
      </a>
    `
    }

  }

}

module.exports = overviewView
