export default function ({ app, error, store, redirect, query }) {
  try {
    store.commit('clearErr')
    const { otpLogin } = store.state.settings
    const forced = query.forced
    if (otpLogin && !forced) {
      let goto = '/otplogin'
      if (query.ref) goto += `?ref=${query.ref}`
      redirect(goto)
    }
  } catch (e) {
  } finally {
    store.commit('busy', false)
  }
}
