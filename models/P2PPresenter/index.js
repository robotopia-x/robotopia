module.exports = globalConfig => ({
  namespace: 'p2p',
  effects: require('./effects')(globalConfig),
  reducers: require('./reducers')(globalConfig),
  state: {
    star: null
  }
})
