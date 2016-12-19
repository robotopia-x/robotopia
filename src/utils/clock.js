const _ = require('lodash')

// Clock
// sends ticks to drive incremental simulation

class Clock {

  constructor () {
    this.timer = new Timer()
    this.clockInterval = 500
    this.prevTickTimestamp = null
  }

  // call to register a single tick handler
  onTick (tickCallback) {
    this.tickCallback = tickCallback
  }

  triggerNextTick () {
    this.tickCallback()
    this.prevTickTimestamp = Date.now()
    this.timeoutID = setTimeout(() => this.triggerNextTick(), this.clockInterval)
  }

  start () {
    if (this.timer.isRunning()) {
      return
    }

    this.timer.start()

    const timeUntilNextTick = this.getTimeUntilNextTick()
    this.timeoutID = setTimeout(() => this.triggerNextTick(), timeUntilNextTick)
  }

  getTimeUntilNextTick () {
    if (!this.prevTickTimestamp) {
      return 0
    }

    return Math.max(0, this.clockInterval - this.timer.now() - this.prevTickTimestamp)
  }

  stop () {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID)
    }

    this.timer.pause()
  }

  setSpeed (interval) {
    this.clockInterval = interval
  }

  getProgress () {
    if (!this.prevTickTimestamp) {
      return 0
    }

    return (this.timer.now() - this.prevTickTimestamp) / this.clockInterval
  }
}

// Timer
// replaces Date.now and adds the ability to pause time
class Timer {

  constructor () {
    this.pausedTimestamp = null
    this.offset = null
  }

  start () {
    if (!this.pausedTimestamp) {
      return
    }

    if (!this.offset) {
      this.offset = Date.now()
      return
    }

    this.offset += (Date.now() - this.pausedTimestamp)
  }

  pause () {
    if (_.isNil(this.pausedTimestamp)) {
      return
    }

    this.pausedTimestamp = Date.now()
  }

  now () {
    if (!_.isNil(this.pausedTimestamp)) {
      return this.pausedTimstamp - this.offset
    }

    return Date.now() - this.offset
  }

  isRunning () {
    return !_.isNil(this.pausedTimestamp)
  }
}

module.exports = new Clock()
