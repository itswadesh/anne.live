import ME from '~/gql/user/me.gql'
export default async function ({ app, error, store, redirect, route }) {
  const client = app.apolloProvider.defaultClient
  try {
    store.commit('clearErr')
    const user = (await client.query({ query: ME, fetchPolicy: 'no-cache' }))
      .data.me
    if (
      user &&
      (user.role === 'vendor' ||
        user.role === 'manager' ||
        user.role === 'admin' ||
        user.role === 'super')
    ) {
      return
    } else if (user) {
      redirect(`/unauthorized#${route.fullPath}`)
    } else {
      redirect(`/login#${route.fullPath}`)
    }
  } catch (e) {
    redirect(`/unauthorized#${route.fullPath}`)
  } finally {
    store.commit('busy', false)
  }
}
