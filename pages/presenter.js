const html = require('choo/html')
const cuid = require('cuid')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})


module.exports = function (globalConfig) {
  return function (state, prev, send) {
    return html`
<div id="login">
  <div class="center">
    <div class="login_window">
      <div class="row">
          <h1>Welcome!</h1>
      </div>
      <p>To continue please enter a rather unique name for your group or create one</p>
      
        <div class="row">
            <input type="text" id="gid" name="gid" class="enter_id" autofocus="autofocus">
            <button class="random_id" onclick=${generateRandom}>Generate Name</button>
        </div>
        <button class="login_start" value="Start" onclick=${start}>Start</button>
      
    </div>
  </div>
</div>
`
    function start (event) {
      event.preventDefault()
      var group = document.getElementById('gid').value
      if (group) {
        send('p2p:createStar', group)
        send('location:set', '/dashboard')
      }
    }

    function generateRandom (event) {
      var group = cuid()
      // extract client fingerprint
      group = group.slice(13, 17)
      document.getElementById('gid').value = group
    }
  }
}
