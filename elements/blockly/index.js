/* global Blockly */
const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')
const initialToolbox = require('./toolbox-options')

const prefix = sf`
  :host, :host > .editor {
    height:100%;
    width: 100%;
  }
`
const blocklyView = widget((update) => {
  let toolbox, workspace, code, onChangeWorkspace

  update(onupdate)

  return html`
    <div class=${prefix}>
      <div class='editor' onload=${initBlockly} onunload=${destroyBlockly}></div>
    </div>
  `

  function onupdate (params) {
    if (workspace == null) {
      return
    }

    if (toolbox !== params.toolbox) {
      workspace.updateToolbox(params.toolbox)
    }

    const newWorkspace = stringToWorkspace(params.workspace)

    if (isWorkspaceEquivalentTo(workspace, newWorkspace)) {
      updateWorkspace(workspace, params.workspace)
    }
  }

  function initBlockly (el) {
    workspace = Blockly.inject(el, toolbox)
    workspace.updateToolbox(initialToolbox)
    workspace.addChangeListener(updateWorkspace)
  }

  function updateCode () {
    const newCode = Blockly.JavaScript.workspaceToCode(workspace)

    // only update call onChangeWorkspace if resulting code from workspace has changed
    if (newCode !== code) {
      code = newCode

      onChangeWorkspace({
        workspace: workspaceToString(workspace),
        code
      })
    }
  }

  function destroyBlockly () {
    workspace.removeChangeListener(updateCode)
  }
})

// reinitialize workspace with xml
function updateWorkspace (workspace, xml) {
  const workspaceXml = Blockly.Xml.textToDom(xml)
  workspace.clear()
  Blockly.Xml.domToWorkspace(workspaceXml, workspace)
}

// creates workspace from xml which is mounted to empty element, because that's how the blockly api works
// only use this to create workspaces to compare to mounted workspace
function stringToWorkspace (string) {
  const container = document.createElement('div')
  const workspace = Blockly.inject(container)
  const workspaceXml = Blockly.Xml.textToDom(string)
  return Blockly.Xml.domToWorkspace(workspaceXml, workspace)
}

function workspaceToString (workspace) {
  const xml = Blockly.Xml.workspaceToDom(workspace)
  return Blockly.Xml.domToText(xml)
}

// checks if workspaces generate both the same code, ignoring position of blocks
// you have to pass in an actual workspace not just strings
function isWorkspaceEquivalentTo (workspace, compareWorkspace) {
  return Blockly.JavaScript.workspaceToCode(workspace) === Blockly.JavaScript.workspaceToCode(compareWorkspace)
}

module.exports = blocklyView
