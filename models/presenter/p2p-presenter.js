const _ = require('lodash')
const ps = require('peer-star')

module.exports = ({
  hubUrl
}) => {
  let star = null
  let addClientCallback = _.noop
  let removeClientCallback = _.noop
  let messageCallback = _.noop

  function joinStar (gid) {
    if (star !== null) {
      stop()
    }

    star = ps({
      hubURL: hubUrl,
      GID: gid,
      isMain: true
    })

    star.on('peer', (peer, id) => {
      addListenersToPeer(peer, id)
      addClientCallback({ id })
    })

    star.on('disconnect', (peer, id) => {
      peer.destroy()
      removeClientCallback({ id })
    })
  }

  function addListenersToPeer (peer, id) {
    peer.on('data', function (message) {
      let decodedMessage
      try {
        decodedMessage = JSON.parse(message)
      } catch (err) {
        return
      }

      const { type, data } = decodedMessage

      if (!type) { // ignore messages with type as invalid
        return
      }

      messageCallback(id, { type, data })
    })
  }

  function stop () {
    if (star === null) {
      return
    }

    star.close()
    star = null
  }

  // send message to all connected peers
  function broadcast ({ type, data }) {
    if (star === null) {
      return
    }

    const message = { type, data }
    _.forEach(star.peers, (peer) => peer.send(JSON.stringify(message)))
  }

  // send message to one specific connected peer
  function sendTo (recipientId, { type, data }) {
    const recipient = star.contacts[recipientId]

    // do nothing if recipient is not connected
    if (!recipient || star.peers.indexOf(recipient) === -1) {
      return
    }

    recipient.send(JSON.stringify({ type, data }))
  }

  return {
    joinStar,
    stop,
    broadcast,
    sendTo,
    onAddClient: (callback) => { addClientCallback = callback },
    onRemoveClient: (callback) => { removeClientCallback = callback },
    onMessage: (callback) => { messageCallback = callback }
  }
}
