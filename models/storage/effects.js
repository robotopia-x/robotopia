module.exports = globalConfig => ({
  saveToLocalStorage: saveToLocalStorage(globalConfig),
  cleanLocalStorage: cleanLocalStorage(globalConfig),
  loadFromLocalStorage: loadFromLocalStorage(globalConfig)
})

function saveToLocalStorage (globalConfig) {
  return inner
  function inner (state, data, send, done) {
    console.log('saving to: localStorage.' + globalConfig.storagePrefix)
    localStorage[globalConfig.storagePrefix] = JSON.stringify(data) // eslint-disable-line
    done()
  }
}

function cleanLocalStorage (globalConfig) {
  return inner
  function inner (state, _, send, done) {
    delete localStorage[globalConfig.storagePrefix] // eslint-disable-line
    done()
  }
}

function loadFromLocalStorage (globalConfig) {
  return inner
  function inner (_, __, send, done) {
    console.log('checking for data at: localStorage.' + globalConfig.storagePrefix)
    var obj = localStorage[globalConfig.storagePrefix] // eslint-disable-line
    if (!obj) {
      console.log('nothing found')
      return done()
    }
    try {
      obj = JSON.parse(obj)
    } catch (err) {
      console.log('error parsing localStorage')
      return done()
    }
    done(null, obj)
  }
}
