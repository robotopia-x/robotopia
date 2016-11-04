const budo = require('budo')
const hotModuleReloading = require('browserify-hmr')

budo(`${__dirname}/src/index.js`, {
  serve: 'bundle.js',
  live: '*.{css,html}',
  port: 3000,
  stream: process.stdout,
  css: '../assets/main.css',
  browserify: {
    transform: ['sheetify/transform', 'babelify'],
    plugin: hotModuleReloading
  }
})
