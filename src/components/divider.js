const widget = require('cache-element/widget')
const html = require('choo/html')

const dividerView = widget((update) => {
  update(onupdate)

  return html`
    <div class=${prefix}>
      <canvas onload=${onload}></canvas>
    </div>
  `

  function onupdate (_render) {
  }

  function onload (el) {
  }
})
