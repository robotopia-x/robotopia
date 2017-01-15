module.exports = {
  toolbox: `
    <xml id="toolbox" style="display: none">
        <category />
    </xml>
  `,
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
