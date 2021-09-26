export default {
  loading(state) {
    return state.loading || false
  },
  error(state) {
    return state.error || null
  },
  settings(state) {
    return state.settings || {}
  },
  megamenu(state) {
    return state.megamenu || []
  },
  store(state) {
    return state.store || {}
  },
}
