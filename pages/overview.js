const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')
const tutorials = require('../assets/tutorial')
const buttonView = require('../elements/button')
const {i18nText} = require('../elements/i18n')

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
    max-width: 950px;
    border-bottom: 1px solid black;
    margin: 20px auto;
    padding: 1em;
  }
  
  :host .category:first-child {
    border-top: 1px solid black;
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
    label: 'Open Editor',
    onClick: () => send('location:set', '#editor')
  })

  const presenterButton = buttonView({
    label: 'Open Presenter',
    onClick: () => send('location:set', '#presenter')
  })

  return html`
    <div class="${prefix}">
      <div class="logo"></div>
      ${githubButtons()}
      <div class="tutorials">
        <h2>Tutorials</h2>
        ${getAllTutorials(tutorials)}
      </div>
      <div class="editor">
        <h2>Competitive Mode</h2>
        ${editorButton}
        ${presenterButton}
      </div>      
      <div class="credits"><a href="#credits">© Credits</a></div>
    </div>
  `
}

function githubButtons () {
  return html`
    <div style="display: flex; justify-content: center">
        <a class="github-button" data-size="large" href="http://github.com/robotopia-x/robotopia">View on github</a>
        <div style="margin: 0 10px;"/>
        <a class="github-button" href="https://github.com/robotopia-x/robotopia" data-icon="octicon-star" data-size="large" data-count-href="/robotopia-x/robotopia/stargazers" data-show-count="true" data-count-aria-label="# stargazers on GitHub" aria-label="Star robotopia-x/robotopia on GitHub">Star</a>        
        <script async defer src="https://buttons.github.io/buttons.js"></script>
    </div>
  `
}

function getAllTutorials (tutorials) {
  return html`
<div class="tutorials">
    ${_.map(tutorials, getTutorialCategory)}
</div>
`

  function getTutorialCategory (category) {
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
          <div class="levelImage" style="background-image: url('assets/tutorial/level-images/${categoryName.toLowerCase()}${index + 1}.png');"></div>
          <div class="levelName">${i18nText('levels', level().id, 'title')}</div>
        </a>
      `
    }
  }
}

module.exports = overviewView
