/*
State:
star = peer-star instance
presenter = simple-peer to Presenter
connection = true if connected to presenter, false if not
username = name of the user (chosen by the user)
 */

module.exports = globalConfig => ({
  namespace: 'p2c',
  effects: require('./effects')(globalConfig),
  reducers: require('./reducers')(globalConfig),
  state: {
    star: null,
    presenter: null,
    username: ''
  }
})
