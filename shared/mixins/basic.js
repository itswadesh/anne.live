import { mapGetters, mapMutations } from 'vuex'
import { typingTimeout } from '../config'

export default {
  data: () => ({
    meta: { end: false, data: [], busy: false },
    data: [],
    count: 0,
    noOfPages: 1,
    currentPage: 1,
    pageSize: 0,
    showFilter: false,
    filterInput: '',
    typingTimeout,
    typingTimer: null,
    sortBy: '',
    listFields: {},
    descending: false,
    props: {},
  }),
  created() {
    this.filterInput = this.$route.query.search
    this.listFields = this.f
    const vm = this
    // console.log(this.listFields)
    if (this.listFields && this.listFields !== undefined) {
      this.listFields.forEach(function (v, k) {
        if (v.noList) {
          vm.listFields.splice(k, 1)
        }
      })
    }
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    changePage(p) {
      const query = { ...this.$route.query }
      query.page = p
      this.$router.push({ query })
    },
    flush() {
      this.meta.end = false
      this.data = [] // Reset query parameters
    },
    sort(pr) {
      this.flush()
      this.descending = !this.descending
      if (this.descending) {
        pr = '-' + pr
      }
      const query = { ...this.$route.query }
      query.sort = pr
      this.$router.push({ query })
    },
    clone(item) {
      // console.log(item)
      const vm = this
      if (!item) {
        return
      }
      this.item = item // Required for cloneConfirmed()
      this.item.parent = item.id
      const cloneConfirmTitle = 'Would you like to clone  ' + this.api + '?'
      this.$swal({
        title: cloneConfirmTitle,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, do it!',
      }).then((result) => {
        if (result.value) {
          vm.cloneConfirmed(this.item)
        }
      })
    },
    async cloneConfirmed(item) {
      const itemCopy = { ...item }
      itemCopy.id = 'new'
      console.log(this.mutation)
      await this.$apollo.mutate({
        mutation: this.mutation,
        variables: itemCopy,
      })
      // this.flush()
      // this.getData()
    },
    remove(id) {
      const vm = this
      if (!id) {
        return
      }
      this.$swal({
        title: 'Are you sure to delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          vm.deleteConfirmed(id)
        }
      })
    },
    async deleteConfirmed(id) {
      try {
        this.clearErr()
        await this.$apollo.mutate({
          mutation: this.deleteMutation,
          variables: { id },
          fetchPolicy: 'no-cache',
        })
        this.flush()
        this.getData()
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
    async getData() {
      const params = this.$route.query
      params.page = +params.page
      params.store = this.$store.state.store && this.$store.state.store.id
      if (this.meta.busy || this.meta.end) return
      this.clearErr()
      // console.log(this.$store.state.store.id)
      try {
        const { data, count, pageSize, page } = (
          await this.$apollo.query({
            query: this.query,
            variables: params,
            fetchPolicy: 'no-cache',
          })
        ).data[this.model]
        if (data) {
          this.meta.page = this.$route.query.page || 1
          this.count = count
          this.pageSize = pageSize
          this.currentPage = page
          this.noOfPages = Math.ceil(count / pageSize)
          this.data = data
        }
      } catch (e) {
        // console.log(e)
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
    go(id) {
      this.$router.push(`/${this.api}/${id}`)
    },
    hideFilterBox() {
      this.showFilter = false
      this.filterInput = ''
      this.flush()
      this.getData()
    },
    parse(items, prop) {
      prop.split('.').forEach((i) => {
        items = items && items[i]
      })
      return items
    },
    parseNested(items, prop) {
      // Parse deeply nested objects
      prop.split('.').forEach((i) => {
        if (items[i]) {
          items = items && items[i]
        } else {
          items = ''
        }
      })
      return items
    },
    setListImage(i) {
      i = ''
    },
    clone1(item) {
      this.clone(item)
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
    '$route.query': {
      immediate: true,
      handler(value, oldValue) {
        if (JSON.stringify(value) === JSON.stringify(oldValue)) return
        if (value.sort) {
          if (value.sort.charAt(0) === '-') {
            this.sortBy = value.sort.substring(1)
            this.descending = true
          } else {
            this.sortBy = value.sort
            this.descending = false
          }
        }
        this.flush()
        this.getData()
      },
    },
  },
}
