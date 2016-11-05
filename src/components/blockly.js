/* global Blockly */

const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')
const toolbox = require('../../lib/toolbox')

const prefix = sf`
  :host, :host > .editor {
    height:100%;
    width: 100%;
  }  
`

const blocklyView = widget((update) => {
  let send, workspace, editorElement

  update(onupdate)

  return html`   
    <div class=${prefix}>
      <div class='editor' onload=${onload} onunload=${onunload}></div>       
    </div>
  `

  function onupdate (state, prev, _send) {
    send = _send
  }

  function onload (el) {
    editorElement = el
    workspace = Blockly.inject(editorElement, { toolbox: toolbox })

    workspace.addChangeListener(updateCode)
  }

  function updateCode () {
    send('updateCode', {
      srcCode: Blockly.JavaScript.workspaceToCode(workspace)
    })
  }

  function onunload () {
    workspace.removeChangeListener(updateCode)
  }
})

module.exports = blocklyView
