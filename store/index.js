import Vue from 'vue'
import Vuex from 'vuex'
import sharedState from '~/shared/store/index/state'
import sharedGetters from '~/shared/store/index/getters'
import sharedMutation from '~/shared/store/index/mutations'
import sharedAction from '~/shared/store/index/actions_saas'
Vue.use(Vuex)

export const state = () => sharedState
export const getters = sharedGetters
export const mutations = sharedMutation
export const actions = sharedAction
