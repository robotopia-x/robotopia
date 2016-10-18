const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')
const _ = require('lodash')

const app = choo()

app.model({
  state: { title: 'Not quite set yet' },
  reducers: {
    update: (data, state) => ({ title: data })
  }
})

const prefix = sf`
  :host {
    font-family: sans-serif;
  }

  h1 {
    color: red;
  }
`

const mainView = (state, prev, send) => html`
  <main class=${prefix}>
    <h1>Title: ${state.title}!</h1>
    <input
      type="text"
      value=${state.title}
      oninput=${(e) => send('update', e.target.value)}>
  </main>
`

app.router((route) => [
  route('/', mainView)
])

// setup hot module replacement
app.use({
  onStateChange: function (data, state, prev, caller, createSend) { window.__state = state },
  wrapInitialState: (obj) => (_.assign({}, obj, window.__state))
})

if (module.hot) {
  module.hot.accept()
}

document.body.innerHTML = ''
document.body.appendChild(app.start())
