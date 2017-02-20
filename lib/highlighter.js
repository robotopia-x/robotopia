const interval = 2000
let schedule, active

function start() {
  if (schedule) return console.log('highlighter already running')
  active = false
  schedule = window.setInterval(highlight, interval)
  highlight()
}

function stop() {
  if (!schedule) return console.log('highlighter was not running')
  window.clearInterval(schedule)
  schedule = null
  active = false
}

function highlight() {
  let x = document.getElementsByClassName("highlight");
  let i;
  for (i = 0; i < x.length; i++) {
    let classes = x[i].className
    if (active) {
      x[i].className = classes + " on";
    } else {
      x[i].className = classes.replace(' on', '')
    }
    active = !active
  }
}

module.exports = {
  start,
  stop
}