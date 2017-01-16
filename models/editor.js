const update = require('immutability-helper')

module.exports = {
  namespace: 'editor',

  state: {
    workspace: '',
    code: ''
  },

  reducers: {
    update: (state, { workspace, code }) =>
      update(state, {
        workspace: { $set: workspace },
        code: { $set: code }
      })
  }
}
