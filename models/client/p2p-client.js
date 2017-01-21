const _ = require('lodash')
const ps = require('peer-star')

module.exports = ({
  hubUrl
}) => {
  let star = null
  let presenterPeer = null
  let connectCallback = _.noop
  let disconnectCallback = _.noop
  let onConnectingCallback = _.noop

  function send (data) {
    if (presenterPeer === null) {
      return
    }

    presenterPeer.send(JSON.stringify(data))
  }

  function stop (cb) {
    if (star === null) {
      return
    }

    star.close(cb)
    star = null
  }

  function joinStar (gid, cid) {
    if (star !== null) {
      return stop(createNew)
    }

    createNew()

    function createNew() {
      star = ps({
        hubURL: hubUrl,
        GID: gid,
        CID: cid,
        isMain: false
      })

      onConnectingCallback()

      star.on('peer', (peer, id) => {
        if (id === 'MAIN') {
          presenterPeer = peer
          connectCallback( gid, star.CID)
        }
      })

      star.on('disconnect', (peer, id) => {
        if (id === 'MAIN') {
          disconnectCallback({ gid })
          presenterPeer = peer
        }
      })
    }
  }

  function onConnect (callback) {
    connectCallback = callback
  }

  function onDisconnect (callback) {
    disconnectCallback = callback
  }

  function onConnecting(callback) {
    onConnectingCallback = callback
  }

  return {
    send,
    joinStar,
    stop,
    onConnect,
    onDisconnect,
    onConnecting
  }
}
