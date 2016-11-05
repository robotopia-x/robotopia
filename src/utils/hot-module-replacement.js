const _ = require('lodash')

module.exports = function (app) {
  app.use({
    onStateChange: function (data, state, prev, caller, createSend) {
      window.__state = state
    },
    wrapInitialState: (obj) => (_.assign({}, obj, window.__state))
  })

  if (module.hot) {
    module.hot.accept()
  }
}
