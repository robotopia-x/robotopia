const _ = require('lodash')
const html = require('choo/html')
const sf = require('sheetify')
const classNames = require('classnames')

const prefix = sf`
  :host {
    padding: 8px 10px;
    margin: 10px;
    border: none;
    border-radius: 3px;
    font-size: 1em;
    color: #676768;
    line-height: 100%;
    background-color: #E0E1E2;
  }

  :host:hover {
    color: #2b2b2b;
    background-color: #CACBCD;
  }

  :host[disabled] {
    opacity: 0.5
  }

  :host.has-icon {
    padding-left: 27px;
    background-repeat: no-repeat;
    background-size: 16px;
    background-position: 10px center;
  }

  :host.has-icon.has-label {
    margin-right: 5px;
  }

  :host.icon-play {
    background-image: url('assets/icons/play.svg');
  }

  :host.icon-pause {
    background-image: url('assets/icons/pause.svg');
  }

  :host.icon-stop {
    background-image: url('assets/icons/stop.svg');
  }
  
  :host.icon-upload {
    background-image: url('assets/icons/upload.svg');
  }
`

function button ({
  icon, label, disabled = false,
  onClick = _.noop, additionalClasses
}) {
  const classes = classNames(
    prefix,
    {
      [`has-icon icon-${icon}`]: !_.isNil(icon),
      'has-label': !_.isNil(label)
    }
  )

  return html`
    <button class="${classes + ' ' + additionalClasses} " onclick=${onClick} disabled=${disabled}>
      ${label}
    </button>
  `
}

module.exports = button
