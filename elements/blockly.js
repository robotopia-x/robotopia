/* global Blockly */
const _ = require('lodash')
const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    height:100%;
    width: 100%;
  }
`

const options = {
  toolbox: '<xml id="toolbox" style="display: none"><category /></xml>',
  collapse: true,
  comments: true,
  disable: true,
  maxBlocks: Infinity,
  trashcan: true,
  scrollbars: true,
  sounds: true,
  grid: {
    spacing: 10,
    length: 1,
    colour: '#DDD',
    snap: true
  },
  zoom: {
    controls: true,
    wheel: false,
    startScale: 1,
    maxcale: 20,
    minScale: 0.5,
    scaleSpeed: 1.05
  }
}

function blocklyWidget () {
  let prevParams = null
  let onChange = _.noop
  let toolbox, workspace, code

  return widget({
    onupdate: (el, params) => {
      onChange = params.onChange

      // ignore if workspace isn't initialized or params haven't changed
      if (!workspace || prevParams.workspace === params.workspace && prevParams.toolbox === params.toolbox) {
        return
      }

      prevParams = params

      if (toolbox !== params.toolbox) {
        workspace.updateToolbox(params.toolbox)
      }

      const newWorkspace = stringToWorkspace(params.workspace)

      if (!isWorkspaceEquivalentTo(workspace, newWorkspace)) {
        updateWorkspace(workspace, params.workspace)
      }
    },

    onload: (el) => {
      workspace = Blockly.inject(el, options)
      workspace.addChangeListener(updateCode)

      if (prevParams === null) {
        return
      }

      // apply initial params
      if (prevParams.toolbox) {
        workspace.updateToolbox(prevParams.toolbox)
        toolbox = prevParams.toolbox
      }
      if (prevParams.workspace) {
        updateWorkspace(workspace, prevParams.workspace)
      }
    },

    onunload: () => {
      prevParams = null
      onChange = _.noop

      workspace.removeChangeListener(updateCode)
      workspace.dispose()
    },

    render: (params) => {
      prevParams = params

      // setup onChange handler
      onChange = params.onChange

      return html`<div class="${prefix}"></div>`
    }
  })

  function updateCode () {
    const newCode = workspaceToOrderedCode(workspace)

    // only update call onChangeWorkspace if resulting code from workspace has changed
    if (newCode !== code) {
      code = newCode

      onChange({
        workspace: workspaceToString(workspace),
        code
      })
    }
  }
}

// reinitialize workspace with xml
function updateWorkspace (workspace, xmlString) {
  const workspaceXml = Blockly.Xml.textToDom(xmlString)
  workspace.clear()
  Blockly.Xml.domToWorkspace(workspaceXml, workspace)
}

function stringToWorkspace (xmlString) {
  const workspace = new Blockly.Workspace(options)
  updateWorkspace(workspace, xmlString)
  return workspace
}

function workspaceToString (workspace) {
  const xml = Blockly.Xml.workspaceToDom(workspace)
  return Blockly.Xml.domToText(xml)
}

// checks if workspaces generate both the same code, ignoring position of blocks
// you have to pass in an actual workspace not just strings
function isWorkspaceEquivalentTo (workspace, compareWorkspace) {
  return workspaceToOrderedCode(workspace) === workspaceToOrderedCode(compareWorkspace)
}

// turns workspace into javascript
// compared to Blockly.Javascript.workspaceToCode this function guarantees that event blocks will be inserted a start
// of the generated JavaScript code
function workspaceToOrderedCode (workspace) {
  const blocks = workspace.getTopBlocks()
  const [eventHandlerBlocks, otherBlocks] = _.partition(blocks, isBlockEventHandler)
  const codeChunks = _.map(eventHandlerBlocks.concat(otherBlocks), (block) => Blockly.JavaScript.blockToCode(block))
  return codeChunks.join('\n')
}

function isBlockEventHandler (block) {
  return block.data === 'EVENT_HANDLER'
}

module.exports = blocklyWidget
