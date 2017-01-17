module.exports = globalConfig => ({
  clientAdded: addClient,
  clientQuit: clientQuit,
  clientLeft: clientLeft,
  updateUsername: updateUsername,
  updateCode: updateCode(globalConfig)
})

