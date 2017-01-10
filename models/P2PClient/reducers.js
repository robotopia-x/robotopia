module.exports = globalConfig => ({
  setPresenterPeer: setPresenterPeer
})

function setPresenterPeer (state, peer) {
  state.presenter = peer
  return state
}
