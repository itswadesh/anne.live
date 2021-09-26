import ME from '~/gql/user/me.gql'
import SETTINGS from '~/gql/settings/settings.gql'
export default async function ({ app, error, store, redirect, route }) {
  const client = app.apolloProvider.defaultClient
  let goto = '/login'
  try {
    const otpLogin = (
      await client.query({ query: SETTINGS, fetchPolicy: 'no-cache' })
    ).data.settings.otpLogin
    if (otpLogin) goto = '/otplogin'
  } catch (e) {}
  try {
    store.commit('clearErr')
    const res = (await client.query({ query: ME, fetchPolicy: 'no-cache' }))
      .data.me
    if (!res) {
      redirect(`${goto}?ref=${route.fullPath}`)
    }
  } catch (e) {
    redirect(`${goto}?ref=${route.fullPath}`)
  } finally {
    store.commit('busy', false)
  }
}
