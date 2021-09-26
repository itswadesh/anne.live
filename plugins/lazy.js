import Vue from 'vue'
import vueLazy from 'vue-lazyload'
export default ({ store, app }) => {
  Vue.use(vueLazy, {
    observer: true,
    preLoad: 1.3,
    error: '/icon.png',
    loading: '/loading.svg',
    attempt: 1,
    // adapter: {
    //     loaded({ src, loading, error }) {
    //         const CDN = store.state.settings.CDN_URL
    //         src = CDN + src
    //     },
    // },
    filter: {
      progressive(listener, options) {
        const CDN_URL = store.state.settings && store.state.settings.CDN_URL
        const S3_URL = store.state.settings && store.state.settings.S3_URL
        let src = listener.src
        if (src) {
          const contains = src.includes(S3_URL)
          if (CDN_URL && S3_URL && contains)
            src = src.replace(S3_URL, CDN_URL + `tr:w-auto,dpr-auto/`)
          listener.el.setAttribute('lazy-progressive', 'true')
          listener.loading = src + '?tr=w-3,h-2'
          listener.src = src
        }
      },
      error(listener, Init) {},
    },
  })
}
