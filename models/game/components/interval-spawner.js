module.exports = {
  intervalSpawner: {
    requires: ['spawner'],

    effects: {
      update: (state) => {


        console.log('step spawner')
      }
    }
  }
}
