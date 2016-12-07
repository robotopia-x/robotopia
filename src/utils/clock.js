// Clock
// sends ticks to drive incremental simulation

class Clock {

  constructor () {
    this.prevTickTimestamp = null
    this.clockInterval = 500
    this.running = false
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
    this.running = true

    const timePassed = (Date.now() - this.prevTickTimestamp)

    // ensure that it's not possible to trigger ticks faster by calling start and stop repeatedly
    if (timePassed < this.clockInterval) {
      const timeUntilNextTick = (this.clockInterval - timePassed)

      this.timeoutID = setTimeout(() => this.triggerNextTick(), timeUntilNextTick)

      return
    }

    this.triggerNextTick()
  }

  stop () {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID)
    }

    this.running = false
  }

  setSpeed (interval) {
    this.clockInterval = interval
  }
}

module.exports = new Clock()
