import { mapGetters } from 'vuex'
import Submit from '~/shared/components/ui/Submit'
export default {
  data() {
    return {
      valid: true,
      store: {
        id: '',
        websiteName: '',
        minimumOrderValue: 0,
        title: '',
        description: '',
        websiteEmail: '',
        shopPhone: '',
        shopAddress: '',
        language: 'en',
        googleMapsApi: '',
        logo: '',
        logoMobile: '',
        logoDark: '',
        logoMobileDark: '',
        openGraphImage: '',
        favicon: '',
        tax: {
          cgst: 0,
          sgst: 0,
          igst: 0,
        },
        shipping: {
          charge: 0,
          free: 0,
          method: 'Standard Shipping',
        },
        product: {
          moderate: false,
        },
        review: {
          enabled: true,
          moderate: false,
        },
        sms: {
          enabled: true,
          provider: 'twilio',
        },
        email: {
          enabled: true,
          orderPlaced: '',
          forgotPasswordEmail: '',
          resetPasswordEmail: '',
          orderPlacedEmail: '',
          orderUpdatedEmail: '',
        },
        storage: {
          enabled: true,
          provider: 'twilio',
        },
      },
    }
  },
  components: { Submit },
  methods: {
    async submit(store) {
      // console.log(store)
      try {
        this.$store.commit('clearErr')
        delete store.tax.__typename
        delete store.sms.__typename
        delete store.email.__typename
        delete store.storage.__typename
        delete store.review.__typename
        delete store.product.__typename
        delete store.shipping.__typename
        delete store.customerOrderNotifications.__typename
        delete store.adminNotifications.__typename
        const data = await this.$post('store/saveStore', this.store)
        // const data = (
        //   await this.$apollo.mutate({
        //     mutation: saveStore,
        //     variables: { ...store },
        //   })
        // ).data.saveStore
        if (data) this.$store.commit('success', 'Store Updated')
        this.$emit('saved')
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
  computed: {
    ...mapGetters({ loading: 'loading' }),
  },
  async created() {
    try {
      this.store = await this.$get('store/store', {})
      // const { data } = await this.$apollo.query({
      //   query: store,
      //   fetchPolicy: 'no-cache',
      // })
      // this.store = data.store
    } catch (e) {
      this.$store.commit('setErr', e)
    }
  },
}
