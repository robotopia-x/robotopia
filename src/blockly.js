/* global Blockly */

const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')

const toolbox = `
  <xml id="toolbox" style="display: none">
      <category name="Logic">
        <block type="controls_if"></block>
        <block type="controls_repeat_ext"></block>
        <block type="logic_compare"></block>
        <block type="math_number"></block>
        <block type="math_arithmetic"></block>
        <block type="text"></block>
        <block type="text_print"></block>
      </category>
      <sep></sep>
      <category name="Movement" colour="210">
        <block type="move"></block>
        <block type="rotate"></block>
      </category>
   </xml>
`

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

  function onupdate (stat, prev, _send) {
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
