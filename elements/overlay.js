const html = require('choo/html')
const sf = require('sheetify')
const classNames = require('classnames')

const prefix = sf`
  :host {
    position: absolute;   
    margin: 20px;
  }
  
  :host.has-frame {
    background-color: rgba(221,221,221,0.85);
    color: #000;
    padding: 10px 15px;
    border-radius: 3px;        
  }
  
  :host.top {
    top: 0
  }
  
  :host.left {
    left: 0
  }
  
  :host.right {
    right: 0
  }
  
  :host.bottom {
    bottom: 0
  }
`

function overlayView ({ content, position, hasFrame = true }) {
  const className = classNames(prefix, position, {
    'has-frame': hasFrame
  })

  return html`
    <div class="${className}">
      ${content}
    </div>
  `
}

module.exports = overlayView
