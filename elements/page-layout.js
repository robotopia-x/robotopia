const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const panelGroup = require('../components/panel-group')

const mainPrefix = sf`
  :host {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`

function pageLayout ({
  header, panels, context,
  send, onload = _.noop
}) {
  const panelGroupHtml = panelGroup.component(...context)('page-layout', {
    props: {
      panelViews: panels
    }
  })

  return html`
    <div class="${mainPrefix}" onload=${onload}>
      ${getHeaderHtml(header)}
      ${panelGroupHtml}
    </div>
  `
}

const headerPrefix = sf`
  :host {
    height: 50px;
    display: flex;
    justify-content: space-between;
    background: #404040;
  }

  :host > .left-side, :host > .right-side {
    align-items: center;
    display: flex;
  }

  :host > .left-side  {
    justify-content: flex-start;
  }

  :host > .right-side {
    justify-content: flex-end;
  }
`

function getHeaderHtml ({ left, right }) {
  let leftSideHtml, rightSideHtml

  if (left) {
    leftSideHtml = html`
      <div class="left-side">${left}</div>
    `
  }

  if (right) {
    rightSideHtml = html`
      <div class="right-side">${right}</div>
    `
  }

  return html`
    <div class="${headerPrefix}">
      ${leftSideHtml}
      ${rightSideHtml}
    </div>
  `
}

module.exports = pageLayout
