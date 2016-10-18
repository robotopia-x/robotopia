const budo = require('budo')
const babelify = require('babelify')
const sheetify = require('sheetify/transform')
const hotModuleReloading = require('browserify-hmr')

budo(`${__dirname}/src/client.js`, {
  serve: 'bundle.js',
  live: '*.{css,html}',
  port: 3000,
  stream: process.stdout,
  browserify: {
    transform: ['sheetify/transform', 'babelify'],
    plugin: hotModuleReloading
  }
})
