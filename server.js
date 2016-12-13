const budo = require('budo')

budo(`${__dirname}/index.js`, {
  serve: 'bundle.js',
  live: '*.{css,html}',
  port: 3000,
  stream: process.stdout,
  css: '../assets/main.css',
  browserify: {
    transform: ['sheetify/transform', 'babelify'],
  }
})
