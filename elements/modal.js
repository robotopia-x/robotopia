const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);    
  }
  
  :host > .inner {
    background: #fff;
    padding: 20px;
    border-radius: 3px;
  }
`

function modalView (content) {
  return html`
    <div class="${prefix}">
      <div class="inner">${content}</div>
    </div>
  `
}

module.exports = modalView
