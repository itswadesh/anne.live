import Vue from 'vue'
import Vuex from 'vuex'
import sharedState from '~/store/auth/state'
import sharedGetters from '~/store/auth/getters'
import sharedMutation from '~/store/auth/mutations'
import sharedAction from '~/store/auth/actions'
Vue.use(Vuex)

export const state = () => sharedState
export const getters = sharedGetters
export const mutations = sharedMutation
export const actions = sharedAction
