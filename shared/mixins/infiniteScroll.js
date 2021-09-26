import { mapMutations } from 'vuex'
export default {
  data: () => ({
    data: [],
    meta: {
      page: 1,
      count: 0,
      sort: null, // null will honour the search result weight
      search: '',
      end: false,
    },
  }),
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    serialize(obj) {
      const str = []
      for (const p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
      return str.join('&')
    },
    async getData(scrolled = false) {
      // const location = this.$cookies.get('geo')
      // if (!location) return this.$router.push('/onboarding')

      // if (this.meta.busy) return
      if (scrolled && this.meta.end) return
      try {
        this.meta.busy = true
        let params = this.$route.query
        delete params.__proto__ // required for ssr
        params.page = this.meta.page
        params.sort = this.$route.query.sortBy
        params.categories = this.$route.params.slug
        // params.store = this.$store.state.store && this.$store.state.store.id
        params = this.serialize(params)
        this.clearErr()
        const { data, count, pageSize, page } = (
          await this.$apollo.query({
            query: this.model,
            variables: { query: params },
            fetchPolicy: 'no-cache',
          })
        ).data[this.attr]
        this.data = scrolled ? this.data.concat(data) : data
        this.loadmoreSpin = false
        this.meta.count = count
        this.meta.filtered =
          parseInt(data.length) + (parseInt(pageSize) - 1) * parseInt(page)
        this.meta.end = data.length < pageSize
      } catch (e) {
        // if (
        //   e &&
        //   e.graphQLErrors &&
        //   e.graphQLErrors[0] &&
        //   e.graphQLErrors[0].message == 'Please select city'
        // )
        //   this.$router.push('/onboarding')
        this.setErr(e)
      } finally {
        this.busy(false)
        this.meta.busy = false
      }
    },
    loadMore() {
      this.meta.page++
      this.getData(true)
    },
    go(url) {
      this.$router.push(`${url}`)
    },
  },
  watch: {
    '$route.query': {
      immediate: false, // false required for ssr
      handler(value, oldValue) {
        if (JSON.stringify(value) === JSON.stringify(oldValue)) return
        this.getData()
      },
    },
  },
}
