// Timer
// replaces Date.now and adds the ability to pause time

class Timer {

  constructor () {
    this.pausedTimestamp = Date.now()
    this.offset = Date.now()
  }

  start () {
    if (this.isRunning()) {
      return
    }

    this.offset += (Date.now() - this.pausedTimestamp)
    this.pausedTimestamp = null
  }

  pause () {
    if (!this.isRunning()) {
      return
    }

    this.pausedTimestamp = Date.now()
  }

  now () {
    if (!this.isRunning()) {
      return this.pausedTimestamp - this.offset
    }

    return Date.now() - this.offset
  }

  isRunning () {
    return this.pausedTimestamp === null
  }
}

module.exports = Timer
