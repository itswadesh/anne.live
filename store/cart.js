import Vue from 'vue'
import Vuex from 'vuex'
import sharedState from '~/shared/store/cart/state'
import sharedGetters from '~/shared/store/cart/getters'
import sharedMutation from '~/shared/store/cart/mutations'
import sharedAction from '~/shared/store/cart/actions_sass'
Vue.use(Vuex)

export const state = () => sharedState
export const getters = sharedGetters
export const mutations = sharedMutation
export const actions = sharedAction
