const html = require('choo/html')

function modal (content) {
  return html`
    <div class="center-child fullscreen_modal">
      <div>
        <div class="round_modal">${content}</div>
      </div>
    </div>
  `
}

module.exports = modal
