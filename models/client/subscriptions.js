module.exports = globalConfig => ({
  saveInterval: function (send, done) {
    setInterval(function () {
      send('saveLocally', null, (err) => {if (err) done(err)})
    }, 10000)
  }
})
