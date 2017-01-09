module.exports = globalConfig => ({
  namespace: null,
  effects: require('./effects')(globalConfig),
  reducers: require('./reducers')(globalConfig),
  subscriptions: require('./subscriptions')(globalConfig),
  state: {
    username: null,
    group: null,
    id: null,
    connectivityState: 0,
    code: null,
    recoveryPossible: false
  }
})
