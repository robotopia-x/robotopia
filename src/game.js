const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host .stage {
    border: 1px solid #000;
    width: 200px;
    height: 200px;
  }

  :host circle {
    fill: red
  }
`

const GameView = ({robot}) => {
  const x = robot.x * 20
  const y = robot.y * 20

  return html`
    <div class=${prefix}>
      <svg viewBox="0 0 200 200" class='stage'>
        <circle class="circle" cx="${x}" cy="${y}" r="10"/>
      </svg>
    </div>
  `
}

module.exports = GameView
