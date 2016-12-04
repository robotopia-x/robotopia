/* global Blockly localStorage */

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

  function onupdate (_state, prev, _send) {
    send = _send
  }

  function onload (el) {
    editorElement = el
    workspace = Blockly.inject(editorElement, { toolbox: toolbox })

    restoreWorkspace(workspace)
    workspace.addChangeListener(updateCode)
  }

  function updateCode () {
    send('updateCode', {
      code: Blockly.JavaScript.workspaceToCode(workspace)
    })

    const xml = Blockly.Xml.workspaceToDom(workspace)
    const xmlText = Blockly.Xml.domToText(xml)
    send('updateWorkspace', {
      workspace: xmlText
    })

    localStorage.setItem('workspace', xmlText)
  }

  function onunload () {
    workspace.removeChangeListener(updateCode)
  }
})

function restoreWorkspace (workspace) {
  const xml = Blockly.Xml.textToDom(localStorage.getItem('workspace'))
  Blockly.Xml.domToWorkspace(xml, workspace)
}

module.exports = blocklyView
