const html = require('choo/html')
const sf = require('sheetify')

const toolbox = `<xml id="toolbox" style="display: none">
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
    </xml>`

const prefix = sf`
  :host {
    height:100%;
    width: 100%;
  }
  
  #blocklyDiv {
    position: absolute;
  }
`
var mountedBlockly = html``

const blocklyView = (state, prev, send) => {
  console.log('rendered')
  return mountedBlockly || html`
    <div id="blocklyArea" class=${prefix}>
      <div id="blocklyDiv" onload=${(el) => {
        if (!mountedBlockly) {
          console.log('mounted')
          var blocklyArea = document.getElementById('blocklyArea')
          var workspace = Blockly.inject(el.id,
            {toolbox: toolbox})

          var onresize = (e) => {
            // Compute the absolute coordinates and dimensions of blocklyArea.
            var element = blocklyArea
            var x = 0
            var y = 0
            do {
              x += element.offsetLeft
              y += element.offsetTop
              element = element.offsetParent
            } while (element)
            // Position blocklyDiv over blocklyArea.
            blocklyDiv.style.left = x + 'px'
            blocklyDiv.style.top = y + 'px'
            blocklyDiv.style.width = blocklyArea.offsetWidth + 'px'
            blocklyDiv.style.height = blocklyArea.offsetHeight + 'px'
          }
          window.addEventListener('resize', onresize, false)
          onresize()
          Blockly.svgResize(workspace)

          workspace.addChangeListener(myUpdateFunction)
          function myUpdateFunction (event) {
            console.log('changed')
            var code = Blockly.JavaScript.workspaceToCode(workspace)
            send('updateCode', { srcCode: code })
          }

          mountedBlockly = document.getElementById('blocklyArea')  
        }
    }}></div>
   </div>
  `
}

module.exports = blocklyView
