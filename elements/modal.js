const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 500;
  }
  
  :host > .inner {
    max-width: 800px;
    background: #fff;
    color: #404040;
    padding: 30px;
    border-radius: 3px;
    border: 10px solid #404040;    
    overflow: scroll;
    z-index: 501;
    animation: move 1s 1 ease;
    animation-delay: 10;
    overflow: hidden;
  }
  
  :host > .inner > .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
  }
  
  :host > .inner .img {
    max-width: 50%;
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
