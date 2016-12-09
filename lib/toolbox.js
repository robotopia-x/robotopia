const toolbox = `
  <xml id="toolbox" style="display: none">
        <block type="controls_repeat_ext"></block>
        <block type="math_number"></block>
        <block type="move"></block>
        <block type="rotate"></block>
        <block type="place_marker"></block>
        <block type="collect_resource"></block>
        <block type="main_logic"></block>
        <block type="event_logic"></block>
   </xml>
`

const options = {
  toolbox : toolbox,
  collapse : true,
  comments : true,
  disable : true,
  maxBlocks : Infinity,
  trashcan : true,
  horizontalLayout : false,
  toolboxPosition : 'start',
  css : true,
  media : 'https://blockly-demo.appspot.com/static/media/',
  rtl : false,
  scrollbars : true,
  sounds : true,
  oneBasedIndex : true,
  grid : {
    spacing : 10,
    length : 1,
    colour : '#DDD',
    snap : true
  },
  zoom : {
    controls : true,
    wheel : true,
    startScale : 1,
    maxcale : 20,
    minScale : 0.5
  }
};

module.exports = { toolbox: toolbox }
