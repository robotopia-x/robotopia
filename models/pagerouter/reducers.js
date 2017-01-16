module.exports = globalConfig => ({
  setPage: setPage
})

function setPage (state, nextPage) {
  state.page = nextPage
  return state
}
