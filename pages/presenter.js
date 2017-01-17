/* globals FormData */
const html = require('choo/html')
const modal = require('../elements/modal')
const button = require('../elements/button')

module.exports = function ({ presenter }, prev, send) {
  if (presenter.groupId === null) {
    return joinGroupDialog({
      onJoinGroup: (groupId) => {
        send('presenter:joinGroup', { groupId })
      }
    })
  }

  const disconnectButtonHtml = button({
    label: 'disconnect',
    onClick: () => send('presenter:disconnect')
  })

  return html`
    <div>
      <pre>${JSON.stringify(presenter)}</pre>
      ${disconnectButtonHtml}
    </div>
  `
}

function joinGroupDialog ({ onJoinGroup }) {
  const buttonHTML = button({
    label: 'submit'
  })

  return modal(html`
    <div>
      <p>To continue please enter a rather unique name for your group or create one!!</p>
      <form onsubmit=${handleSubmit}>
          <input type="text" name="groupId" autofocus>
          ${buttonHTML}
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