export default {
  setGuest(state, data) {
    state.guest = data
  },
  setToken(state, data) {
    state.token = data
  },
  setUser(state, data) {
    state.user = data
  },
  clearUser(state) {
    state.user = null
  },
  setZip(state, zipcode) {
    state.zipcode = zipcode
    localStorage.setItem('zipcode', zipcode)
    Cookie.set('zipcode', zipcode)
  },
}
