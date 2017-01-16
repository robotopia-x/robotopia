const _ = require('lodash')
const ps = require('peer-star')

module.exports = ({
  hubUrl, cid
}) => {
  let star = null
  let presenterPeer = null
  let connectCallback = _.noop
  let disconnectCallback = _.noop

  function send (data) {
    if (presenterPeer === null) {
      return
    }

    presenterPeer.send(JSON.stringify(data))
  }

  function stop () {
    if (star === null) {
      return
    }

    star.close()
    star = null
  }

  function joinStar (gid) {
    if (star !== null) {
      stop()
    }

    star = ps({
      hubURL: hubUrl,
      GID: gid,
      CID: cid,
      isMain: false
    })

    star.on('peer', (peer, id) => {
      if (id === 'MAIN') {
        presenterPeer = peer
        connectCallback({ gid })
      }
    })

    star.on('disconnect', (peer, id) => {
      if (id === 'MAIN') {
        disconnectCallback({ gid })
        presenterPeer = peer
      }
    })
  }

  function onConnect (callback) {
    connectCallback = callback
  }

  function onDisconnect (callback) {
    disconnectCallback = callback
  }

  return {
    send,
    joinStar,
    stop,
    onConnect,
    onDisconnect
  }
}