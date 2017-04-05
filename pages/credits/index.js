const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')
const team = require('./team')

const prefix = sf`
  :host {
    color: #404040;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
  }
  
  :host div {
    align-items: center;
    margin-bottom: 25px;
  } 
  
  :host > .logo {
    width: 100%;
    height: 15%;
    min-height: 250px;
    background-image: url('assets/icons/robotopia.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 0;
  }

  :host > .people > .person {
    display: flex;
    flex-direction: row;
    width: 70%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  
  .person > .personImg {
    width: 100px;
    border-radius: 10px;
    margin-right: 20px;
  }
  
  .person > .personInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 0;
  }
  
  .personInfo h2 {
    margin:0;
    margin-bottom: 7px;
    padding: 0;
  }
  
  .personInfo h4 {
    color: #808080;
    margin:0;
    margin-bottom: 10px;
    padding: 0;
  } 
   
  .person .links {
    display: flex;
    flex-direction: row;
    margin-bottom: 0;
  }
  
  .links > a {
    color: #404040;
    text-decoration: none;
    margin-right: 25px;
  }
  
  .links > a:hover {
    color: #dddddd;
  }
  
  .links > .githubLink:before {
    background-image: url('assets/icons/github.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    content: '';
    width: 25px;
    height: 25px;
    padding-left: 30px;
  }
  
  .personInfo > p {
    color: #808080;
  }
`

const creditsView = (state, prev, send) => {
  return html`
    <div class="${prefix}">
      <div class="logo"></div>
      <div class="people">
        ${_.map(team, (person) => personDiv(person))}
      </div>
    </div>
  `
}

function personDiv ({ name, role, img, github, homepage, desc }) {
  const githubName = github.split('/').pop()

  return html`
    <div class="person">
      <img src="${img}" class="personImg">
      <div class="personInfo">
        <h2>${name}</h2>
        <h4>${role}</h4>
        <div class="links">
          <a href="${github}" class="githubLink">${githubName}</a>
          ${homepage ? html`<a href="${homepage}">${homepage}</a>` : html``}
        </div>
        <p>${desc}</p>
      </div>
    </div>
  `
}

module.exports = creditsView
