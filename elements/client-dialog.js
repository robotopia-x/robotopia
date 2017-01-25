/* globals FormData */

const html = require('choo/html')
const modalView = require('./modal')
const buttonView = require('./button')

module.exports = function ({
  client,
  onSetUsername, onJoinGroup, onDisconnect, onDenyRecovery
}) {
  if (client.connected) {
    return html`<div></div>`
  }

  if (client.connecting === true) {
    return waitForConnectionDialog({ onCancel: onDenyRecovery })
  }

  if (client.recoveryPossible) {
    return recoveryDialog({
      recover: () => {
        onJoinGroup(client.groupId)
      },
      cancel: onDenyRecovery
    })
  }

  if (client.username === null) {
    return setUsernameDialog({ onSetUsername })
  }

  if (client.groupId === null) {
    return joinGroupDialog({ onJoinGroup })
  }

  return html`<div></div>`
}

function recoveryDialog ({
  recover,
  cancel
}) {
  const recoverButtonHtml = buttonView({
    label: 'recover',
    onClick: (evt) => {
      recover()
    }
  })
  const cancelButtonHtml = buttonView({
    label: 'cancel',
    onClick: (evt) => {
      cancel()
    }
  })

  return modalView(html`
    <div class="content">
      <p>I found a previous Session on your Browser, would you like to recover?</p>
        ${recoverButtonHtml}
        ${cancelButtonHtml}
    </div>
  `)
}

function setUsernameDialog ({
  onSetUsername
}) {
  const submitButtonHtml = buttonView({
    label: 'save'
  })

  return modalView(html`
    <div class="content">
      <p>Please enter your name</p>
    
      <form onsubmit=${handleSubmit}>
        <input name="username" type="text" autofocus minlength="2" maxlength="30" value="">
        ${submitButtonHtml}
      </form>
    </div>
  `)

  function handleSubmit (evt) {
    const formData = new FormData(evt.target)
    const username = formData.get('username')

    evt.preventDefault()

    onSetUsername(username)
  }
}

function joinGroupDialog ({
  onJoinGroup
}) {
  const submitButtonHtml = buttonView({
    label: 'join'
  })

  return modalView(html`
    <div class="content">
      <p>Please enter the name of the group you would like to join</p>
        
      <form onsubmit=${handleSubmit}>
        <input name="groupId" type="text" autofocus minlength="2" maxlength="30" value="">
        ${submitButtonHtml}
      </form>
    </div>
  `)

  function handleSubmit (evt) {
    const formData = new FormData(evt.target)
    const groupId = formData.get('groupId')

    evt.preventDefault()

    onJoinGroup(groupId)
  }
}

function waitForConnectionDialog ({
  onCancel
}) {
  const cancelButtonHtml = buttonView({
    label: 'cancel',
    onClick: onCancel
  })

  return modalView(html`
    <div class="content">
      <h1>Connecting...</h1>
      
      <img src="../assets/img/web/load.gif" alt="loading" class="connecting">
                  
      ${cancelButtonHtml}
    </div>
  `)
}
