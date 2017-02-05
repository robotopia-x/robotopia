const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const classNames = require('classnames')

const prefix = sf`
  :host {
    display: flex;    
    white-space: nowrap;
    flex-direction: row;
    align-items: center;
    padding: 8px 10px;
    margin: 10px;
    border: none;
    border-radius: 3px;
    font-size: 1em;
    font-family: sans-serif;
    color: #404040;
    line-height: 100%;
    background-color: #dddddd;
  }

  :host:hover {
    color: #2b2b2b;
    background-color: white;
  }

  :host[disabled] {
    opacity: 0.5
  }

  :host.has-icon:before {
    content: '';
    width: 16px;
    height: 16px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  :host.has-icon.has-label:before {
    margin-right: 5px;
  }

  :host.icon-play:before {
    background-image: url('assets/icons/play.svg');
  }

  :host.icon-pause:before {
    background-image: url('assets/icons/pause.svg');
  }

  :host.icon-stop:before {
    background-image: url('assets/icons/stop.svg');
  }
  
  :host.icon-upload:before {
    background-image: url('assets/icons/upload.svg');
  }
`

function button ({
  icon, label, disabled = false,
  onClick = _.noop
}) {
  const classes = classNames(
    prefix,
    {
      [`has-icon icon-${icon}`]: !_.isNil(icon),
      'has-label': !_.isNil(label)
    }
  )

  return html`
    <button class="${classes}" onclick=${onClick} disabled=${disabled}>
      ${label}
    </button>
  `
}

module.exports = button
