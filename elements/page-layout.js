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

  :host > .header {
    height: 65px;
    margin: 0;
    padding: 5px 0 0 50px;
    font-size: 26px;
    font-weight: normal;
    font-family: Arial;
    color: #fff;
    background: #03A9F4;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .header > a {
    color: white;
    text-decoration: none;
  }
  
  .header > a > img {
    height: 55px;
    margin-right: 10px;
  }
  
  :host > .content {
    height: calc(100% - 65px)
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

function getHeaderHtml (menu) {
  return html`
    <div class="header">
      <a href="/"><img src="./assets/icons/logo.svg"></a>
      <a href="/">ROBOTOPIA</a>
    </div>
  `
}

module.exports = pageLayout
