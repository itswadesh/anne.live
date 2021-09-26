import Vue from 'vue'
import Vuex from 'vuex'
import sharedState from '../shared/store/auth/state'
import sharedGetters from '../shared/store/auth/getters'
import sharedMutation from '../shared/store/auth/mutations'
import sharedAction from '../shared/store/auth/actions'
Vue.use(Vuex)

export const state = () => sharedState
export const getters = sharedGetters
export const mutations = sharedMutation
export const actions = sharedAction
