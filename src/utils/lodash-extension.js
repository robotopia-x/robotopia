const _ = require('lodash')

function capitalizeFirstLetter (str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

_.mixin({
  capitalizeFirstLetter
})
