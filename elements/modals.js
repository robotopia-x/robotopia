const html = require('choo/html')
const sf = require('sheetify')

const winPrefix = sf`
  :host {
    position: absolute;
    left: 10%;
    top: 10%;
    color: white;
    width: 80%;
    height: 80%;
    z-index: 100;
    display: block;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #FFFFFF;
    color: #404040;
    text-align: center;
    overflow: scroll;
    border: 10px solid #404040;
  }
  
  :host .storyTime {
  }
  
  :host .goals {
  }
  
  button {
    width: 10%;
  }
  
  img {
    width: 50%;
  }
`

function storyModal ({
  header, story, img, goals, buttonText,
  onClick
}) {
  return html`
    <div class="${winPrefix}">
      <h1>${header}</h1> 
      <div class="storyTime">
        <p>Super awesome story here...</p>
        <p>${story}</p>
        ${img ? html`<img src="${img}"/>` : html``}
        <div class="goals">
          <h2>Goals: </h2>
          ${goals}
        </div>
      </div>
      <button onclick=${onClick}>${buttonText}</button>
    </div>
    `
}

function winModal ({
  header, goals, buttonText,
  onClick
}) {
  return html`
    <div class="${winPrefix}">
      <h1>${header}</h1>  
      <div class="goals">
        <h2>Goals: </h2>
        ${goals}
      </div>
      <button onclick=${onClick}>${buttonText}</button>
    </div>
    `
}

module.exports = {
  storyModal,
  winModal
}
