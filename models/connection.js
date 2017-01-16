// stores in which state the current connection is
module.exports = {
  namespace: 'connection',

  state: {
    state: 'INDEX'
  },

  reducers: {
    set: (state, nextState) => {
      return { state: nextState }
    }
  }
}
