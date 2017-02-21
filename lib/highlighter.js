const interval = 2000

const highlighter = () => {
  let self = this
  self.highlightTheseIds = []
  self.highlightTheseClasses = []
  self.highlightTheseNames = []
  self.start = start
  self.stop = stop

  let schedule, active

  return self

  function start () {
    if (schedule) return console.log('Highlighter already running')
    active = false
    schedule = window.setInterval(highlight, interval)
    highlight()
  }

  function stop () {
    if (!schedule) return console.log('Highlighter was not running')
    window.clearInterval(schedule)
    schedule = null
    active = false
  }

  function highlight () {
    let elements = []
    let i
    for (i in self.highlightTheseClasses) {
      let toAdd = document.getElementsByClassName(self.highlightTheseClasses[i])
      if (toAdd) {
        let i
        for (i = 0; i < toAdd.length; i++) elements.push(toAdd[i])
      }
    }
    for (i in self.highlightTheseNames) {
      let toAdd = document.getElementsByName(self.highlightTheseNames[i])
      if (toAdd) {
        let i
        for (i = 0; i < toAdd.length; i++) elements.push(toAdd[i])
      }
    }
    for (i in self.highlightTheseIds) {
      let toAdd = document.getElementById(self.highlightTheseIds[i])
      if (toAdd) elements.push(toAdd)
    }
    for (i = 0; i < elements.length; i++) {
      let classes = elements[i].className
      if (classes.indexOf('highlight') === -1) {
        classes = classes + ' highlight'
      }
      if (active) {
        elements[i].className = classes + ' HL_on'
      } else {
        elements[i].className = classes.replace(/\s*HL_on/g, '')
      }
    }
    active = !active
  }
}

module.exports = highlighter
