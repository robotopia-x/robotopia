const update = require('immutability-helper')

function setProgress (state, { progress }) {
  return update(state, {
    progress: { $set: progress }
  })
}

module.exports = {
  setProgress
}