module.exports = globalConfig => ({
  namespace: 'presenter',
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
