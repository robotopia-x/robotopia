// Clock
// sends ticks to drive incremental simulation

class Clock {

  constructor () {
    this._clockInterval = 500
  }

  start (onTick) {
    this._onTick = onTick

    if (this._running) {
      return
    }

    this._running = true

    this.triggerNextTick()
  }

  triggerNextTick () {
    if (!this._running) {
      return
    }

    this._onTick()

    setTimeout(() => {
      this.triggerNextTick()
    }, this._clockInterval)
  }

  stop () {
    this._running = false
  }

  setSpeed (interval) {
    this._clockInterval = interval
  }
}

module.exports = new Clock()
