const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf('./style.css')

function timer ({
  seconds
}) {
  
  let _minutes = Math.floor (seconds / 60)
  let _seconds = seconds % 60
  
  return html`
    <div class="${prefix}"><div class="timer_inner_container"><div class="timer_side"><div class="timer_digit">${Math.floor(_minutes / 10)}</div><div class="timer_digit">${_minutes % 10}</div></div><div class="timer_divider">:</div><div class="timer_side"><div class="timer_digit">${Math.floor(_seconds / 10)}</div><div class="timer_digit">${_seconds % 10}</div></div></div></div>
  `
}

module.exports = timer
