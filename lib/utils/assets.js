/* global Image */

const _ = require('lodash')

const store = {}

function load (images) {
  const loadingImages = _.map(images, (url, id) => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.src = url
      image.onload = () => resolve({ id, file: image })
    })
  })

  return Promise.all(loadingImages)
    .then((images) => {
      _.forEach(images, ({ id, file }) => {
        store[id] = file
      })
    })
}

module.exports = {
  load,
  store
}
