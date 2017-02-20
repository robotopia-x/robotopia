/* global Blockly */
require('./blocks')
require('./javascript-commands')

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
const DEFAULT_OPTIONS = {
  toolbox: '<xml id="toolbox" style="display: none"><category /></xml>',
  collapse: true,
  comments: true,
  disable: true,
  maxBlocks: Infinity,
  trashcan: false,
  scrollbars: true,
  sounds: true,
  grid: {
    spacing: 20,
    length: 1,
    colour: '#DDD',
    snap: true
  },
  zoom: {
    controls: false,
    wheel: false,
  }
}

function blocklyWidget () {
  let container = null
  let prevParams = null
  let onChange = _.noop
  let blocklyWorkspace = null
  let toolbox

  return widget({
    onupdate: (el, params) => {
      onChange = params.onChange

      // ignore if workspace isn't initialized or params haven't changed
      if (blocklyWorkspace === null || (prevParams.workspace === params.workspace && prevParams.toolbox === params.toolbox)) {
        return
      }

      prevParams = params

      if (toolbox !== params.toolbox) {
        blocklyWorkspace.updateToolbox(params.toolbox)
      }

      const newBlocklyWorkspace = stringToWorkspace(params.workspace)

      if (!isWorkspaceEquivalentTo(blocklyWorkspace, newBlocklyWorkspace)) {
        updateWorkspace(blocklyWorkspace, params.workspace)
      }
    },

    onload: (_container) => {
      container = _container
      blocklyWorkspace = Blockly.inject(container, DEFAULT_OPTIONS)
      blocklyWorkspace.addChangeListener(updateCode)

      // remove background color
      container.querySelector('.blocklyMainBackground').style = ''

      if (prevParams === null) {
        return
      }

      if (prevParams.toolbox) {
        blocklyWorkspace.updateToolbox(prevParams.toolbox)
        toolbox = prevParams.toolbox
      }
      // apply initial params
      if (prevParams.workspace) {
        updateWorkspace(blocklyWorkspace, prevParams.workspace)
      }
    },

    onunload: () => {
      prevParams = null
      onChange = _.noop

      blocklyWorkspace.removeChangeListener(updateCode)
      blocklyWorkspace.dispose()
    },

    render: (params) => {
      prevParams = params

      // setup onChange handler
      onChange = params.onChange

      return html`<div class="${prefix}"></div>`
    }
  })

  function updateCode () {
    // don't trigger update code if block is being dragged
    if (container.querySelector('.blocklyDragging') !== null) {
      return
    }

    onChange({
      workspace: workspaceToString(blocklyWorkspace),
      code: workspaceToOrderedCode(blocklyWorkspace)
    })
  }
}

// reinitialize workspace with xml
function updateWorkspace (workspace, xmlString) {
  const workspaceXml = Blockly.Xml.textToDom(xmlString)
  workspace.clear()
  Blockly.Xml.domToWorkspace(workspaceXml, workspace)
  Blockly.svgResize(workspace)
}

function stringToWorkspace (xmlString) {
  const workspace = new Blockly.Workspace(DEFAULT_OPTIONS)
  const workspaceXml = Blockly.Xml.textToDom(xmlString)
  Blockly.Xml.domToWorkspace(workspaceXml, workspace)

  return workspace
}

function workspaceToString (workspace) {
  const xml = Blockly.Xml.workspaceToDom(workspace)
  return Blockly.Xml.domToText(xml)
}

// checks if workspaces generate both the same code, ignoring position of blocks
// you have to pass in an actual workspace not just strings
function isWorkspaceEquivalentTo (workspace, compareWorkspace) {
  const workspaceCode = workspaceToOrderedCode(workspace)
  const compareCode = workspaceToOrderedCode(compareWorkspace)

  return workspaceCode === compareCode
}

// turns workspace into javascript
// compared to Blockly.Javascript.workspaceToCode this function guarantees that event blocks will be inserted a start
// of the generated JavaScript code
function workspaceToOrderedCode (workspace) {
  const blocks = workspace.getTopBlocks()
  const [eventHandlerBlocks, otherBlocks] = _.partition(blocks, isBlockEventHandler)

  // TODO: remove this hack
  // blocks that create new variables need to access the variableDB to ensure they don't override existing variables
  // the variableDB is provided by the workspace but since we are generating the code block wise we need to provide
  // our own variableDB

  // save reference to original value
  const originalVariableDB_ = Blockly.JavaScript.variableDB_

  // monkey patch variableDB
  Blockly.JavaScript.variableDB_ = getFakeVariableDB()

  const codeChunks = _.map(eventHandlerBlocks.concat(otherBlocks), (block) => {
    return Blockly.JavaScript.blockToCode(block)
  })

  // restore variableDB
  Blockly.JavaScript.variableDB_ = originalVariableDB_

  return codeChunks.join('\n')
}

function getFakeVariableDB () {
  let counter = 0

  return {
    getDistinctName: () => {
      const name = `i_${counter}`
      counter += 1
      return name
    }
  }
}

function isBlockEventHandler (block) {
  return block.data === 'EVENT_HANDLER'
}

module.exports = blocklyWidget
