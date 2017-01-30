const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')

const mainPrefix = sf`
  :host {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

function pageLayout ({
  header, panels,
  onload = _.noop
}) {
  return html`
    <div class="${mainPrefix}" onload=${onload}>
      ${getHeaderHtml(header)}
      ${getPanelsHtml(panels)}
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

const panelsPrefix = sf`
  :host {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  :host > * {
    height: 100%;
    width: 100%;
  }

  :host > .divider {
    background: #404040;
    width: 10px;
    height: 100%;
    cursor: ew-resize;
    flex-shrink: 0;
  }

  :host > .divider:hover {
    background: #848484;
  }
`

function getPanelsHtml (panels) {
  const panelsHtml = _(panels)
    .map((panelHtml) => [panelHtml, html`<div class="divider"></div>`]) // add divider elements between panels
    .flatten()
    .value()
    .slice(0, -1) // omit divider after last panel

  return html`
    <div class="${panelsPrefix}">
      ${panelsHtml}
    </div>
  `
}

module.exports = pageLayout
