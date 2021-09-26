import ME from '~/gql/user/me.gql'
export default async function ({ app, error, store, redirect, query }) {
  const client = app.apolloProvider.defaultClient
  try {
    store.commit('clearErr')
    const res = (await client.query({ query: ME, fetchPolicy: 'no-cache' }))
      .data.me
    if (res) {
      const goto = query.ref || '/my'
      redirect(`${goto}`)
    }
  } catch (e) {
  } finally {
    store.commit('busy', false)
  }
}
