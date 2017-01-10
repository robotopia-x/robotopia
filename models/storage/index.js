module.exports = globalConfig => ({
  namespace: 'storage',
  effects: require('./effects')(globalConfig),
  reducers: require('./reducers')(globalConfig),
  state: {
    
  }
})
