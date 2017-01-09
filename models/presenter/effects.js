module.exports = globalConfig => ({
  messageIncoming: messageIncoming
})

function messageIncoming (_, data, send, done) {
  var update = {
    id: data.id
  }
  if (data.type === 'USERNAME' && data.content.length > 0) {
    update.name = data.content
    send('updateUsername', update, (err, res) => { if (err) done(err) })
    return done()
  }
  if (data.type === 'CODE' && data.content.length > 0) {
    update.code = data.content
    send('updateCode', update, (err, res) => { if (err) done(err) })
    return done()
  }
  if (data.type === 'QUIT') {
    console.log('client ' + data.id + ' quit.')
    send('clientQuit', data, (err, res) => { if (err) done(err) })
    return done()
  }
  done()
}
