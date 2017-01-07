const toolbox = `
  <xml id="toolbox" style="display: none">
        <category name="Logic" colour="100">
          <block type="controls_repeat_ext"></block>
          <block type="math_number"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Variables" colour="170">
          <block type="marker"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Movement" colour="250">
          <block type="move"></block>
          <block type="rotate"></block>
          <block type="move_to"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Actions" colour="50">
          <block type="place_marker"></block>
          <block type="collect_resource"></block>
          <block type="build_tower"></block>
        </category>
        
        <sep gap="8"></sep>
        
        <category name="Events" colour="20">
          <block type="event_logic"></block>
        </category>
   </xml>
`

const options = {
  toolbox: toolbox,
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
    wheel: true,
    startScale: 1,
    maxcale: 20,
    minScale: 0.5,
    scaleSpeed: 1.05
  }
}

module.exports = options
