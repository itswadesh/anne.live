export default function ({ app, error, store, redirect }) {
  try {
    const str = store.state.store || {}
    if (str.domain === 'anne.biz') {
      const landing = store.$cookies.get('landing')
      if (!landing) redirect('/landing')
    }
  } catch (e) {}
}
