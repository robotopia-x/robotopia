/* global Blockly localStorage */
const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')
const toolbox = require('../lib/blockly/toolbox')

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
    if (prev && _state.toolbox !== prev.toolbox) {
      updateToolbox(workspace, _state.toolbox)
    }

    send = _send
  }

  function onload (el) {
    //throw new Error

    editorElement = el
    workspace = Blockly.inject(editorElement, toolbox)

    updateWorkspaceBlocks(workspace, localStorage.getItem('workspace'))

    workspace.addChangeListener(updateCode)
  }

  function updateCode () {
    console.log('updated')

    const xml = Blockly.Xml.workspaceToDom(workspace)
    const xmlText = Blockly.Xml.domToText(xml)

    send('updateWorkspace', {
      workspace: xmlText
    })

    localStorage.setItem('workspace', xmlText)

    send('updateCode', {
      code: Blockly.JavaScript.workspaceToCode(workspace)
    })
  }

  function onunload () {
    workspace.removeChangeListener(updateCode)
  }
})

function updateWorkspaceBlocks (workspace, xml) {
  const workspaceXml = Blockly.Xml.textToDom(xml)
  Blockly.Xml.domToWorkspace(workspaceXml, workspace)
}

function updateToolbox (workspace, toolbox) {
  workspace.updateToolbox(toolbox)
}

module.exports = blocklyView
