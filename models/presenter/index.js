module.exports = globalConfig => ({
  namespace: null,
  effects: require('./effects')(globalConfig),
  reducers: require('./reducers')(globalConfig),
  state: {
    clients: {
      ids: [],
      names: {},
      peers: {},
      code: {}
    }
  }
})
