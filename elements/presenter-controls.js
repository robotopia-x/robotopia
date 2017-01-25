const button = require('./button')

function startButtonView ({
  isRunning,
  onStart, onStop
}) {
  if (isRunning) {
    return button({
      onClick: onStop,
      icon: 'stop',
      label: 'Stop 1v1'
    })
  }

  return button({
    onClick: onStart,
    icon: 'play',
    label: 'Start 1v1'
  })
}

module.exports = {
  startButtonView
}
