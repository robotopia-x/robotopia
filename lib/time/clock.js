const _ = require('lodash')
const raf = require('raf')
const Timer = require('./timer')

// Clock
// sends ticks to drive incremental simulation

class Clock {

  constructor () {
    this.timer = new Timer()
    this.intervalDuration = 550
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
    this.timeoutID = setTimeout(() => this.triggerNextTick(), this.intervalDuration)
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

    return Math.max(0, this.intervalDuration - (this.timer.now() - this.prevTickTimestamp))
  }

  stop () {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID)
    }

    this.timer.pause()
  }

  setIntervalDuration (intervalDuration) {
    this.intervalDuration = intervalDuration
  }

  getProgress () {
    if (_.isNil(this.prevTickTimestamp)) {
      return 0
    }

    return _.clamp((this.timer.now() - this.prevTickTimestamp) / this.intervalDuration, 0, 1)
  }
}

module.exports = Clock
