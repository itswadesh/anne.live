import { DOMAIN } from '~/shared/config/index'
import STORE_ONE from '~/gql/store/storeOne.gql'
import SETTINGS from '~/gql/settings/settings.gql'
import MEGAMENU from '~/gql/category/megamenu.gql'
import INIT from '~/gql/groupQueries/INIT.gql'
import SAVE_FCM_TOKEN from '~/gql/fcmToken/saveFcmToken.gql'
export default {
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
  async nuxtClientInit({ state, commit, dispatch }, context) {
    await dispatch('fetchOnce', DOMAIN)
  },
}
