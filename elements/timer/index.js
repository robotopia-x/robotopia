const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf('./style.css')

function timer ({
  seconds
}) {
  let minutes = Math.floor(seconds / 60)
  let secondsUntilFullMinute = seconds % 60

  return html`
    <div class="${prefix}">
      <div class="timer_inner_container">
        <div class="timer_side">
          <div class="timer_digit">${Math.floor(minutes / 10)}</div>
          <div class="timer_digit">${minutes % 10}</div>
        </div>
        <div class="timer_divider">:</div>
        <div class="timer_side">
          <div class="timer_digit">${Math.floor(secondsUntilFullMinute / 10)}</div>
          <div class="timer_digit">${secondsUntilFullMinute % 10}</div>
        </div>
      </div>
    </div>
  `
}

module.exports = timer
