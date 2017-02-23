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
    text-align: center;
  }
  
  :host .category {
    width: 95%;
    border-bottom: 1px solid black;
    margin: 20px auto;
    padding: 1em;
  }
  
  :host .name {
    text-align: left;
    font-size: 150%;
    font-weight: 600;
  }
  
  :host .level {
    width: 250px;
    overflow: hidden;
    display: inline-block;
    position: relative;
    margin: 20px;
    text-decoration: none;
  }
  
  :host .level:hover {
    opacity: 0.8;
    color: #404040;
  }
  
  :host .level > div{
    width: 100%;
    position: relative;
    text-align: center;
  }
  
  :host .levelImage {
    width: 250px;
    height: 250px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 5px;
  }
  
  :host .levelName {
    font-weight: 600;
    line-height: 150%;
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
      <div class="credits"><a href="#credits">© Credits</a></div>
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
    const categoryName = category.categoryName
    return html`
      <div class="category">
        <div class="name">${categoryName}</div>
        ${_.map(category.levels, getTutorial)}
      </div>
`

    function getTutorial(level, index) {
      const oneIndex = index + 1
      return html`
      <a href="#tutorial/${categoryName}/${oneIndex}" class="level">
        <div class="levelImage" style="background-image: url('assets/tutorial/levelImages/${categoryName}${index + 1}.PNG');"></div>
        <div class="levelName">${level().label}</div>
      </a>
    `
    }

  }

}

module.exports = overviewView
