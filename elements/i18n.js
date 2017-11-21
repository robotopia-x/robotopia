const _ = require('lodash')
const language = require('../assets/languages/en.json')

function i18nText () {
  const path = _.toArray(arguments).join('.')
  const text = _.get(language, path)

  if (!text) {
    console.warn(`Missing translation: ${path}`)

    return `{{${path}}}`
  }

  return text
}

module.exports = { i18nText }
