import Vue from 'vue'
import Vuex from 'vuex'
import sharedState from './store/index/state'
import sharedGetters from './store/index/getters'
import sharedMutation from './store/index/mutations'
import sharedAction from './store/index/actions'
Vue.use(Vuex)

export const state = () => sharedState
export const getters = sharedGetters
export const mutations = sharedMutation
export const actions = sharedAction
