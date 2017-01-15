// const sf = require('sheetify')
const html = require('choo/html')

module.exports = function (globalConfig) {
  return function (state, prev, send) {
    return html`
<div>
    <h1>Error, error 404</h1>
</div>
`
  }
}
