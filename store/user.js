import ME from '~/gql/user/me.gql'

const state = () => ({
  signedIn: false,
})

const getters = {
  // async fetch({ commit, state, getters }) {
  //   try {
  //     commit('clearErr', null, { root: true })
  //     commit('busy', true, { root: true })
  //     const data = (
  //       await this.app.apolloProvider.defaultClient.query({
  //         query: ME,
  //         fetchPolicy: 'no-cache',
  //       })
  //     ).data.me
  //     // console.log(data)
  //     commit('setUser', data)
  //     return data
  //   } catch (e) {
  //     // commit('setErr', e, { root: true })
  //   } finally {
  //     commit('busy', false, { root: true })
  //   }
  // },
}

const mutations = {
  SIGNIN: (state) => {
    state.signedIn = true
  },
}

const actions = {
  signin({ commit, state }) {
    // console.log('signing')
    commit('SIGNIN')
    return true
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
