import vPagination from 'vue-plain-pagination'
import WISHLISTS from '~/gql/wishlist/wishlists.gql'
import Pagination from '~/shared/components/ui/Pagination.vue'
import ProductSkeleton from '~/components/ProductSkeleton.vue'
import DesktopFilters from '~/components/DesktopFilters.vue'
import MobileFilters from '~/components/MobileFilters.vue'
import HeaderBody from '~/components/HeaderBody.vue'
import NoProduct from '~/components/NoProduct.vue'
import { constructURL } from '~/lib/'
import { BackToTopDark, Loading } from '~/shared/components/ui'
export default {
  components: {
    HeaderBody,
    DesktopFilters,
    MobileFilters,
    Pagination,
    Loading,
    vPagination,
    NoProduct,
    ProductSkeleton,
    BackToTopDark,
  },
  data() {
    return {
      showMobileFilter: false,
      fl: {
        brands: [],
        categories: [],
        colors: [],
        sizes: [],
        price: [],
        sort: null,
        features: { Type: [], Fit: [], Fabric: [], Neck: [], Color: [] },
      },
      meta: {
        skip: 0,
        limit: 40,
        sort: null, // null will honour the search result weight
        search: '',
        end: false,
      },
      products: [],
      facets: [],
      category: {},
      productCount: 0,
      currentPage: 1,
      loading: false,
    }
  },
  computed: {
    noOfPages() {
      return Math.ceil(
        this.productCount /
          (this.$store.state.store && this.$store.state.store.pageSize)
      )
    },
  },
  mounted() {
    this.currentPage = parseInt(this.$route.query.page)
  },
  watch: {
    $route: {
      // immediate: true, // Throws error this.$fetch not a function
      handler(value, oldValue) {
        const q = this.$route.params.q
        const query = { ...this.$route.query }
        const qry = { ...this.$route.query } // Prevent query sync
        // Remove extra q & page param => Add page param only on page change & refresh
        delete query.page
        delete query.brand // This is to delete the parent brand which comes from category megamenu
        delete query.q
        Object.keys(query).map(function (k, i) {
          if (
            query[k] &&
            !Array.isArray(query[k]) &&
            query[k] !== null &&
            query[k] !== '' &&
            k !== 'price' &&
            k !== 'age' &&
            k !== 'discount' &&
            k !== 'store'
          )
            query[k] = query[k].split(',')
        })
        this.fl = query // For selected filters
        if (q) qry.q = q
        this.$fetch()
        // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', qry)
        // this.getData(qry)
      },
    },
  },
  methods: {
    changePage(p) {
      const query = this.$route.query
      query.page = +p
      query._ = new Date().getTime()
      this.scrollToTop()
      const url = constructURL('/', query)
      const cslug = this.$route.path.substr(1)
      this.$router.push(`/${cslug}${url}&page=${p}`)
    },
    scrollToTop() {
      if (process.client) {
        // console.log('scroll..........')
        // window.scroll({
        //   behavior: 'smooth',
        //   left: 0,
        //   top: 300,
        // })
      }
    },
    changed(e) {
      this.fl[e.model] = e.checked.join(',')
      const c = this.$route.path.slice(1)
      const fl = Object.assign({}, this.fl)
      delete fl.page
      delete fl.categories
      const url = this.constructURL('/', c, fl)
      this.$router.push(`${url}page=1`)
    },
    constructURL(url, category, fl) {
      if (category) url += category + '?'
      Object.keys(fl).forEach((e) => {
        if (fl[e] && fl[e] !== 'undefined' && fl[e].length > 0)
          url += `${e}=${fl[e]}&`
      })
      return url
    },
    go(slug) {
      this.$router.push(`/${slug}`)
    },
    facetRemoved(f) {
      this.fl = f
    },
    filterRemoved(filter, name, data, multiple) {
      const list = this.$route.query[name].split(',')
      list.splice(list.indexOf(filter), 1)
      const mappedList = list.map((b) => {
        return b
      })
      this.fl[name] = mappedList
      this.changed({ model: name, checked: mappedList })
    },
    clearAllFilters() {
      this.fl = {}
      const c = this.$route.path.slice(1)
      const fl = {}
      const url = this.constructURL('/', c, fl)
      this.$router.push(`${url}page=1`)
    },
    mergeToWishlist(products, wishlist) {
      try {
        if (wishlist.length > 0) {
          products.map((p) => {
            for (const w of wishlist) {
              if (
                p._id === w.product._id &&
                p.variants[0]._id === w.variant._id
              ) {
                p.wished = true
              }
            }
          })
        }
      } catch (e) {}
    },
    loadMore(p) {
      // Will not work this way, data must append to the existing data
      p = p || 1
      this.changePage(+p + 1)
    },
    sortNow() {
      this.flush() // To allow http get request
      // this.getData()
    },
    flush() {
      this.meta.end = false
      this.meta.skip = 0
      this.meta.limit =
        this.$store.state.store && this.$store.state.store.pageSize
      this.products = [] // Reset query parameters
    },
    async getWishlist() {
      const user = (this.$store.state.auth || {}).user || null
      if (user) {
        try {
          this.wishlist = await this.$get('wishlist/wishlists', {})
          // this.wishlist = (
          //   await this.$apollo.query({ query: WISHLISTS })
          // ).data.wishlist
        } catch (e) {}
      }
    },
    saveLastVisit() {
      if (!process.server) {
        const lastVisit =
          this.$router &&
          this.$router.currentRoute &&
          this.$router.currentRoute.fullPath
        localStorage.setItem('lastVisit', lastVisit)
      }
    },
  },
}
