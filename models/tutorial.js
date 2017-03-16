const _ = require('lodash')
const update = require('immutability-helper')
const levels = require('../assets/tutorial')

let willStopOnNextTick = false
let currentLevel

module.exports = {
  namespace: 'tutorial',

  state: {
    level: null,
    isStoryModalOpen: true,
    events: {}
  },

  reducers: {
    _setLevel: (state, { level }) => {
      return update(state, {
        level: { $set: level },
        isStoryModalOpen: { $set: true }
      })
    },

    setDisplayStoryModal: (state, { open }) => {
      return update(state, {
        isStoryModalOpen: { $set: open }
      })
    },

    _updateEvents: (state, events) => {
      return update(state, {
        events: { $set: events }
      })
    }
  },

  effects: {
    loadLevel: (state, { category, index }, send) => {
      const level = getLevelIfExistent(category, index)

      if (level !== undefined) {
        currentLevel = { category: category, index: parseInt(index) }
        send('tutorial:resetEvents', null, _.noop)
        send('tutorial:_setLevel', { level }, _.noop)
        send('game:loadGameState', { loadState: level.game }, _.noop)
        send('editor:update', { workspace: level.editor.workspace }, _.noop)
      }
    },

    nextLevel: (state, cb, send) => {
      if (!currentLevel || !currentLevel.hasOwnProperty('category') || !currentLevel.hasOwnProperty('index')) {
        return
      }
      const prevIndex = currentLevel.index
      const prevCategory = currentLevel.category
      let level = getLevelIfExistent(prevCategory, prevIndex + 1)
      if (level) {
        // send('tutorial:loadLevel', { category: prevCategory, index: prevIndex }, _.noop)
        console.log('loading next level of same category')
        return cb('#tutorial/' + prevCategory + '/' + (prevIndex + 1))
      }
      const oldCategoryIndex = _.findIndex(levels, { 'categoryName': currentLevel.category })
      if (oldCategoryIndex === -1 || oldCategoryIndex + 1 === levels.length) {
        // was last category or unknown
        return cb('#editor')
      }
      const nextCategory = levels[oldCategoryIndex + 1]
      if (!nextCategory || !nextCategory.hasOwnProperty('categoryName')) {
        // jumps to tutorial overview
        return cb('')
      }
      console.log('loading next level of next category')
      // send('tutorial:loadLevel', { category: nextCategory.categoryName, index: 1 }, _.noop)
      return cb('#tutorial/' + nextCategory.categoryName + '/1')
    },

    resetEvents: (state, data, send) => {
      willStopOnNextTick = false
      send('tutorial:_updateEvents', {}, _.noop)
    },

    sendEvent: (state, event, send) => {
      const type = event.type
      if (!type) {
        return state
      }
      if (type === 'clock') {
        return send('tutorial:_updateEvents', handleClockEvent(state.events, event, send), _.noop)
      }
      if (type === 'levelWon') {
        willStopOnNextTick = true
        return
      }
    }
  }
}

function handleClockEvent (events, event, send) {
  if (!event.hasOwnProperty('operation')) {
    return events
  }
  if (event.operation === 'tick') {
    if (willStopOnNextTick) {
      send('clock:stop', null, _.noop)
      willStopOnNextTick = false
    }
    return update(events, {
      time: { $set: events.time + 1 }
    })
  }
  if (event.operation === 'set' && event.hasOwnProperty('value') && !isNaN(event.value)) {
    return update(events, {
      time: { $set: event.value }
    })
  }
}

function getLevelIfExistent (category, index) {
  let _index
  try {
    // subtract 1 from index to work 1 based externally and 0 based internally.
    _index = parseInt(index) - 1
  } catch (e) {
    console.log('please specify the index as a number (min: 1)')
    return
  }
  if (!category || isNaN(_index)) {
    return
  }
  const _category = _.find(levels, { 'categoryName': category })
  if (!_category || !_category.hasOwnProperty('levels') || _category.levels.length <= _index) {
    return
  }
  const level = _category.levels[_index]
  if (level) {
    return level()
  }
}
