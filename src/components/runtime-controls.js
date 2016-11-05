const html = require('choo/html')

function runtimeControlsView (state, prev, send) {
  if (state.running) {
    return html`
      <button disabled>running...</button>
   `
  }

  return html`
    <button onclick=${() => send('runCode', { })}>run</button>
  `
}

module.exports = runtimeControlsView
