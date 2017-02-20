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
    padding: 25px 0 0 100px;
    font-size: 26px;
    font-weight: normal;
    color: #fff;
    background: #03A9F4;
    background-image: url('./assets/icons/logo.svg');
    background-size: 50px;
    background-position: 45px 5px;
    background-repeat: no-repeat;    
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
      panelViews
    },
    initialState: {
      panelSizes: panelSizes
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
    <h1 class="header">
      Robotopia
    </h1>
  `
}


module.exports = pageLayout