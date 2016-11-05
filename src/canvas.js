const widget = require('cache-element/widget')
const html = require('choo/html')
const sf = require('sheetify')

const prefix = sf`
  :host {
    height:100%;
    width: 100%;
  }  
`
const canvasView = widget((update) => {
  let send, ctx

  update(onupdate)

  return html`
  
  `


})

