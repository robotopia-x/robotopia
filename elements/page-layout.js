const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const panelGroup = require('../components/panel-group')

const pageLayoutPrefix = sf`
  :host {
    width: 100vw;
    height: 100vh;
    display: flexbox;
  }
  
  :host > .content {
    height: calc(100% - 50px)
  }
`

function pageLayout ({
  context, id, panels, menu
}) {
  const panelSizes = _.map(panels, 'size')
  const panelViews = _.map(panels, 'view')

  const contentHtml = panelGroup.component(...context)(id, {
    props: {
      panelViews,
      initialPanelSizes: panelSizes
    }
  })

  return html`
    <div class="${pageLayoutPrefix}">
      ${getHeaderHtml(menu)}
      <div class="content">
        ${contentHtml}
      </div>
    </div>
  `
}

const headerPrefix = sf`
  :host {
    height: 50px;
    margin: 0;
    padding:  0 10px 0 20px;
    color: #fff;
    background: #03A9F4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  
  :host > .logo {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: normal;
    font-family: sans-serif;
  }
  
  :host > .logo > img {
    height: 40px;
    margin-right: 10px;
  }
`

function getHeaderHtml (menu) {
  return html`
    <div class="${headerPrefix}">
    
      <a href="#" class="logo">
      <img src="./assets/icons/logo.svg">
      ROBOTOPIA
      </a>
      
      <div class="menu">
        ${menu}
      </div>
    </div>
  `
}

module.exports = pageLayout
