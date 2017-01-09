module.exports = globalConfig => ({
  namespace: null,
  effects: require('./effects')(globalConfig),
  reducers: require('./reducers')(globalConfig),
  state: {
    recoveryPossible: false
  }
})
