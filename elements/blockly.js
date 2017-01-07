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
  let send, workspace, editorElement, saveInterval

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

    /* TODO change workspace if workspace is updated externally
      insted of only updating it when the level is changed
      blockly shouldn't need to know about levels */
    if (prev && _state.level.level !== prev.level.level) {
      clearWorkspace(workspace)
      updateWorkspace(workspace, _state.workspace)
    }

    send = _send
  }

  function onload (el) {
    editorElement = el
    workspace = Blockly.inject(editorElement, toolbox)

    updateWorkspace(workspace, localStorage.getItem('workspace'))

    workspace.addChangeListener(updateCode)
    saveInterval = setInterval(saveWorkspaceFromDom, 1000)
  }

  function updateCode () {
    send('runtime:commitCode', {
      code: Blockly.JavaScript.workspaceToCode(workspace)
    })
  }

  function saveWorkspaceFromDom () {
    const xml = Blockly.Xml.workspaceToDom(workspace)
    const xmlText = Blockly.Xml.domToText(xml)

    send('updateWorkspace', {
      workspace: xmlText
    })

    localStorage.setItem('workspace', xmlText)
  }

  function onunload () {
    workspace.removeChangeListener(updateCode)
    clearInterval(saveInterval)
  }
})

function updateWorkspace (workspace, xml) {
  const workspaceXml = Blockly.Xml.textToDom(xml)
  Blockly.Xml.domToWorkspace(workspaceXml, workspace)
}

function clearWorkspace (workspace) {
  workspace.clear()
}

function updateToolbox (workspace, toolbox) {
  workspace.updateToolbox(toolbox)
}

module.exports = blocklyView
