/* globals Event */
const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const update = require('immutability-helper')
const component = require('choo-component').default
const classNames = require('classnames')

// PanelGroup
//
// creates multiple panels which are separated by dividers which can be used to resize the panels

const DIVIDER_WIDTH = 10

const prefix = sf`
  :host {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  :host.resizing {
    cursor: ew-resize;
  }

  :host > .panel, :host > .divider {
    height: 100%;
    flex-grow: 0;
    overflow: auto;
  }

  :host > .panel {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  :host > .divider {
    background: #fff;
    border: 1px solid grey;
    border-width: 0 1px;
    width: 10px;
    height: 100%;
    cursor: ew-resize;
    flex-shrink: 0;
    flex-grow: 0;
  }
`

module.exports = component({
  model: {
    namespace: 'panelGroup',

    state: {
      selectedPanelIndex: null,
      panelSizes: null
    },

    reducers: {
      initPanelSizes: (state, { panelSizes }) =>
        update(state, { panelSizes: { $set: panelSizes } }),

      resizeGroup: (state, { width }) => {
        const { panelSizes } = state
        const totalWidth = _.reduce(panelSizes, (sum, width) => sum + width, 0)
        const newPanelSizes = _.map(panelSizes, (panelWidth) => (panelWidth / totalWidth) * width)

        return update(state, {
          panelSizes: { $set: newPanelSizes }
        })
      },

      selectPanel: (state, { panelIndex }) =>
        update(state, {
          selectedPanelIndex: { $set: panelIndex }
        }),

      _resizePanel: (state, { position }) => {
        const { panelSizes, selectedPanelIndex } = state

        if (selectedPanelIndex === null) {
          return
        }

        const size = panelSizes[selectedPanelIndex]
        const offset = _.reduce(panelSizes.slice(0, selectedPanelIndex), (sum, size) => sum + size, 0)
        const newSize = _.clamp(position - offset, 0, size + panelSizes[selectedPanelIndex + 1])
        const sizeChange = newSize - size

        return update(state, {
          panelSizes: {
            [selectedPanelIndex]: { $set: newSize },
            [selectedPanelIndex + 1]: { $set: panelSizes[selectedPanelIndex + 1] - sizeChange }
          }
        })
      }
    },

    effects: {
      resizePanel: (state, { instanceId, position }, send) => {
        const { selectedPanelIndex } = state.instances[instanceId]

        if (selectedPanelIndex === null) {
          return
        }

        // trigger resize event on window to make dynamic panels work which have javascript resize logic
        window.dispatchEvent(new Event('resize'))

        send('panelGroup:_resizePanel', { position }, _.noop)
      }
    }
  },

  render: ({
    panelSizes, selectedPanelIndex, panelViews, initialPanelSizes,
    initPanelSizes, resizeGroup, selectPanel, resizePanel
  }) => {
    let windowResizeHandler

    // add divider elements between panels
    const panelsHtml = _(panelViews)
      .map((panelHtml, index) => {
        const width = panelSizes !== null ? `${panelSizes[index]}px` : '100%'

        return [
          html`<div class="panel" style="width: ${width}">${panelHtml}</div>`,
          html`<div class="divider" onmousedown=${() => selectPanel({ panelIndex: index })}></div>`
        ]
      })
      .flatten()
      .value()
      .slice(0, -1) // omit divider after last panel

    const className = classNames(prefix, {
      resizing: selectedPanelIndex !== null
    })

    // console.log('render panelSizes', panelSizes)

    return html`
      <div class="${className}"
           onload=${init}
           onunload=${unload}
           onmousemove=${(evt) => resizePanel({ position: evt.clientX - ((selectedPanelIndex + 0.5) * DIVIDER_WIDTH) })}
           onmouseleave=${() => selectPanel({ panelIndex: null })}
           onmouseup=${() => selectPanel({ panelIndex: null })}>
        ${panelsHtml}
      </div>
    `

    function init (panelsContainer) {
      setTimeout(() => {
        windowResizeHandler = () =>
          resizeGroup({ width: getPanelsTotalWidth(panelsContainer, panelViews.length) })

        windowResizeHandler()

        window.addEventListener('resize', windowResizeHandler)
      })
    }

    function unload () {
      window.removeEventListener('resize', windowResizeHandler)
    }
  }
})

// returns width of container, subtracting the width of divider
function getPanelsTotalWidth (panelsContainer, numberOfPanels) {
  return (panelsContainer.getBoundingClientRect().width - ((numberOfPanels - 1) * DIVIDER_WIDTH))
}
