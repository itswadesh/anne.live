import { mapGetters } from 'vuex'
import settings from '~/gql/settings/settings.gql'
import saveSettings from '~/gql/settings/saveSettings.gql'
import Submit from '~/shared/components/ui/Submit'
export default {
  data() {
    return {
      valid: true,
      settings: {
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
    async submit(setting) {
      // console.log(setting)
      try {
        this.$store.commit('clearErr')
        delete setting.tax.__typename
        delete setting.sms.__typename
        delete setting.email.__typename
        delete setting.storage.__typename
        delete setting.review.__typename
        delete setting.product.__typename
        delete setting.shipping.__typename
        delete setting.customerOrderNotifications.__typename
        delete setting.adminNotifications.__typename
        const data = await this.$post('settings/saveSettings', settings)
        // const data = (
        //   await this.$apollo.mutate({
        //     mutation: saveSettings,
        //     variables: { ...setting },
        //   })
        // ).data.saveSettings
        if (data) this.$store.commit('success', 'Settings Updated')
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
      this.settings = await this.$get('settings/settings', {})
      // const { data } = await this.$apollo.query({
      //   query: settings,
      //   fetchPolicy: 'no-cache',
      // })
      // this.settings = data.settings
    } catch (e) {
      this.$store.commit('setErr', e)
    }
  },
}
