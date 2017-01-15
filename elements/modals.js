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
  
  :host .goals h5, h6 {
    margin: 0;
  }
  
  button {
    width: 10%;
  }
  
  img {
    max-height: 50%;
  }
`

function storyModal ({
  header, story, hint, img, mandatoryGoals, optionalGoals, buttonText,
  onClick
}) {
  return html`
    <div class="${winPrefix}">
      <h1>${header}</h1> 
      <div class="storyTime">
        <p>${story}</p>
        <p>(Hint: ${hint})</p>
      </div>
      ${img ? html`<img src="${img}"/>` : html``}
      <div class="goals">
        <div>
          <h5>Goals: </h5>
          ${mandatoryGoals}
        </div>
        <div>
          <h6>Optional: </h6>
          ${optionalGoals}
        </div>
      </div>
      <button onclick=${onClick}>${buttonText}</button>
    </div>
    `
}

function winModal ({
  header, mandatoryGoals, optionalGoals, buttonText,
  onClick
}) {
  return html`
    <div class="${winPrefix}">
      <h1>${header}</h1>  
      <div class="goals">
        <div>
          <h5>Goals: </h5>
          ${mandatoryGoals}
        </div>
        <div>
          <h6>Optional: </h6>
          ${optionalGoals}
        </div>
      </div>
      <button onclick=${onClick}>${buttonText}</button>
    </div>
    `
}

module.exports = {
  storyModal,
  winModal
}
