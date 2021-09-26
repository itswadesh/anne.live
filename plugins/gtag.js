import Vue from 'vue'
import VueGtag from 'vue-gtag'
import { GOOGLE_ANALYTICS_ID } from '~/shared/config/index'
console.log('GOOGLE_ANALYTICS_ID.........................', GOOGLE_ANALYTICS_ID)
Vue.use(VueGtag, {
  config: { id: 'G-KKQS4XYNFZ' },
})
