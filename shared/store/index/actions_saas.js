import STORE_ONE from '~/gql/store/storeOne.gql'
import SETTINGS from '~/gql/settings/settings.gql'
import MEGAMENU from '~/gql/category/megamenu.gql'
import INIT from '~/gql/groupQueries/INIT.gql'
import SAVE_FCM_TOKEN from '~/gql/fcmToken/saveFcmToken.gql'
export default {
  async fcm({ commit, state, getters }) {
    try {
      if (process.client) {
        const currentToken = await this.$fire.messaging.getToken({})
        if (currentToken) {
          await this.app.apolloProvider.defaultClient.mutate({
            mutation: SAVE_FCM_TOKEN,
            variables: { id: 'new', token: currentToken, platform: 'web' },
            fetchPolicy: 'no-cache',
          })
        } else {
          // Show permission request UI
          // console.log(
          //   'No registration token available. Request permission to generate one.'
          // )
          // ...
        }
      }
    } catch (e) {
      // console.log('FCM:::', e.toString())
    }
  },
  async fetchSettings({ commit, state, getters, $fire, params }, domain) {
    try {
      commit('clearErr')
      const settings = (
        await this.app.apolloProvider.defaultClient.query({ query: SETTINGS })
      ).data.settings
      commit('settings', settings)
    } catch (e) {
      commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async fetchOnce({ commit, state, getters, $fire, params }, domain) {
    try {
      commit('clearErr')
      const som = (
        await this.app.apolloProvider.defaultClient.query({
          query: INIT,
          variables: { domain },
          errorPolicy: 'all',
        })
      ).data
      const settings = som.settings
      const stor = som.storeOne
      const megamenu = som.megamenu
      const popularSearches = som.popularSearches
      const cart = som.cart
      const me = som.me
      commit('settings', settings)
      commit('megamenu', megamenu)
      commit('popularSearches', popularSearches) // We don't want it here because it will slowdown initial load
      commit('store', stor)
      commit('auth/setUser', me)
      commit('cart/setCart', cart)
    } catch (e) {
      commit('auth/setUser', null)
      commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async fetch({ commit, state, getters, $fire, params }, domain) {
    try {
      commit('clearErr')
      const variables = { domain }
      // if(domain.includes('.misiki.in'))
      //  variables = { slug:'' }
      // console.log(variables)
      const stor = (
        await this.app.apolloProvider.defaultClient.query({
          query: STORE_ONE,
          variables,
        })
      ).data.storeOne
      if (stor) {
        const megamenu = (
          await this.app.apolloProvider.defaultClient.query({
            query: MEGAMENU,
            variables: { store: stor.id },
          })
        ).data.megamenu
        commit('megamenu', megamenu)
        commit('store', stor)
      }
      // const observer = this.app.apolloProvider.defaultClient.subscribe({
      //   query: SUBSCRIPTION_SETTINGS_UPDATED,
      // })

      // observer.subscribe({
      //   next({ data }) {
      //     settings = data.settingsUpdated
      //     commit('settings', settings)
      //     // console.log(data.settingsUpdated)
      //   },
      //   error(error) {
      //     console.error('Settings subscription error', error)
      //   },
      // })
    } catch (e) {
      console.error('An error occurred while retrieving token. ', e)

      if (
        e.toString() !==
        'Error: Network error: Unexpected token E in JSON at position 0'
      )
        commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async nuxtClientInit({ state, commit, dispatch }, context) {
    // dispatch('fcm')
    // await dispatch('fetch')
    // await dispatch('auth/fetch')
    // await dispatch('cart/fetch')
  },
  async nuxtServerInit({ state, commit, dispatch }, { params, app, req }) {
    const host = req.headers.host
    // console.log('Host..............', host)
    // .replace('https://', '')
    // .replace('http://', '')
    const domain = new URL('http://' + host)
    // console.log(domain)
    // await dispatch('fetchSettings')
    // if (!params.store) return
    // app.router.base = params.store || '/'
    // console.log('nuxtServerInit')
    // await dispatch('fetch', domain.hostname)
    await dispatch('fetchOnce', domain.hostname)
    // await dispatch('auth/fetch', domain.hostname)
    // await dispatch('cart/fetch', domain.hostname)
  },
}
