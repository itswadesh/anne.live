import { mapGetters } from 'vuex'
import { typingTimeout } from './../config'
export default {
  data: () => ({
    count: 0,
    showFilter: false,
    filterInput: '',
    typingTimeout,
    typingTimer: null,
  }),
  created() {
    this.filterInput = this.$route.query.search
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
  methods: {
    hideFilterBox() {
      this.showFilter = false
      this.filterInput = ''
      this.flush()
      this.getData()
    },
  },
  watch: {
    filterInput: {
      immediate: false,
      handler(value, oldValue) {
        if (!oldValue) return // Do not trigger on page load
        clearTimeout(this.typingTimer)
        const vm = this
        this.typingTimer = setTimeout(function () {
          if (!value || value === 'undefined') value = '' // When clear button clicked
          const query = { ...vm.$route.query }
          query.page = 1
          query.search = value
          vm.$router.push({ query })
        }, vm.typingTimeout)
      },
    },
  },
}
