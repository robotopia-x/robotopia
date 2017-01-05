const html = require('choo/html')
const sf = require('sheetify')

const helpPrefix = sf`
  :host {
    position: absolute;
    left: 10%;
    top: 10%;
    background-color: #404040;
    color: white;
    width: 80%;
    height: 80%;
    z-index: 100;
    display: block;
    padding: 25px;
  }
  
  :host .modalContent {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #FFFFFF;
    color: #404040;
    height: 100%;
    text-align: center;
    } 
  
  :host .navColumn {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-right: 10px solid #404040;
  }
  
  :host .contentColumn {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`

const helpView = (state, send) => {
  if (true) {
    return html`
    <div class="${helpPrefix}">
      <div class="modalContent">
        <div class="navColumn">
          <h1>Help</h1>
          <ul>
            <li><a href="#tutorial">Moving Blocks</a></li>
            <li><a href="#tutorial">Disabling Blocks</a></li>
            <li><a href="#tutorial">Copying Blocks</a></li>
          </ul>
          
          <button onclick="">Close</button>
        </div>
        <div class="contentColumn"> 
          <p>Content here...</p>
        </div>
      </div>
    </div>
    `
  }
}

module.exports = helpView
