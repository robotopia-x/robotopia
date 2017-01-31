const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const update = require('immutability-helper')
const component = require('choo-component')

// PanelGroup
// creates multiple panels which are separated by dividers which can be used to resize the panels

const prefix = sf`
  :host {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  :host > * {
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    overflow: auto;
  }

  :host > .divider {
    background: #404040;
    width: 10px;
    height: 100%;
    cursor: ew-resize;
    flex-shrink: 0;
    flex-grow: 0;
  }

  :host > .divider:hover {
    background: #848484;
  }
`

module.exports = component({
  model: {
    namespace: 'panelGroup',

    state: {
      panelSizes: null
    },

    reducers: {
      initPanelSizes: (state, { panelSizes }) =>
        update(state, { panelSizes: { $set: panelSizes } }),

      resizeGroup: (state, { width }) => {
        const { panelSizes } = state
        const totalWidth = _.reduce(panelSizes, (sum, width) => sum + width, 0)
        console.log('total width', totalWidth, panelSizes)

        const newPanelSizes = _.mapValues(panelSizes, (panelWidth) => (panelWidth / totalWidth) * width)

        return update(state, {
          panelSizes: { $set: newPanelSizes }
        })
      }
    }
  },

  view: ({
    panelSizes, panelViews,
    initPanelSizes, resizeGroup
  }) => {
    let panelsHtml

    // skip rendering of panelViews on first render, because we need to know the size of the container first
    if (panelSizes !== null) {
      // add divider elements between panels
      panelsHtml = _(panelViews)
        .map((panelHtml, i) => [
          html`<div class="panel" style="width: ${panelSizes[i]}px">${panelHtml}</div>`,
          html`<div class="divider" data-resize-handle data-panel-id="${i}"></div>`
        ])
        .flatten()
        .value()
        .slice(0, -1) // omit divider after last panel
    }

    return html`
      <div class="${prefix}" onload=${init}>
        ${panelsHtml}
      </div>
    `

    function init (panelsContainer) {
      const initialPanelSizes = getInitialPanelSizes(panelsContainer, panelViews)

      initPanelSizes({ panelSizes: initialPanelSizes })

      window.addEventListener('resize', () =>
        resizeGroup({ width: getPanelsTotalWidth(panelsContainer, panelViews.length) })
      )
    }
  }
})

function getInitialPanelSizes (panelsContainer, panelViews) {
  const panelWidth = getPanelsTotalWidth(panelsContainer, panelViews.length) / panelViews.length

  return _.reduce(panelViews, (sizes, panelView, i) => {
    sizes[i] = panelWidth
    return sizes
  }, {})
}

// returns width of container substracting width of divider
function getPanelsTotalWidth (panelsContainer, numberOfPanels) {
  return (panelsContainer.getBoundingClientRect().width - ((numberOfPanels - 1) * 10))
}
