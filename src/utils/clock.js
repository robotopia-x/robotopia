const _ = require('lodash')
const raf = require('raf')

// Clock
// sends ticks to drive incremental simulation

class Clock {

  constructor () {
    this.timer = new Timer()
    this.clockInterval = 500
    this.prevTickTimestamp = null

    this.tickCallback = _.noop
    this.progressCallback = _.noop
  }

  // call to register a single tick handler
  onTick (tickCallback) {
    this.tickCallback = tickCallback
  }

  onProgress (progressCallback) {
    this.progressCallback = progressCallback
  }

  triggerNextTick () {
    this.tickCallback()

    this.prevTickTimestamp = this.timer.now()
    this.timeoutID = setTimeout(() => this.triggerNextTick(), this.clockInterval)
  }

  triggerProgress () {
    if (!this.timer.isRunning()) {
      return
    }

    raf(() => this.triggerProgress())
    this.progressCallback(this.getProgress())
  }

  start () {
    if (this.timer.isRunning()) {
      return
    }

    this.timer.start()

    const timeUntilNextTick = this.getTimeUntilNextTick()
    this.timeoutID = setTimeout(() => this.triggerNextTick(), timeUntilNextTick)

    this.triggerProgress()
  }

  getTimeUntilNextTick () {
    if (!this.prevTickTimestamp) {
      return 0
    }

    return Math.max(0, this.clockInterval - (this.timer.now() - this.prevTickTimestamp))
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
    if (_.isNil(this.prevTickTimestamp)) {
      return 0
    }

    return _.clamp((this.timer.now() - this.prevTickTimestamp) / this.clockInterval, 0, 1)
  }
}

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
    return _.isNil(this.pausedTimestamp)
  }
}

module.exports = new Clock()
