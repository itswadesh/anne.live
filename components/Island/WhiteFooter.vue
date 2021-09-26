<template>
  <div class="w-full p-8 text-gray-800 bg-white">
    <div class="w-full my-4 border-b-2 border-gray-400"></div>
    <div class="flex flex-row justify-between">
      <div class="text-sm font-normal tracking-wider md:mt-0 whitespace-nowrap">
        © {{ year }} {{ store.name }}
        <span v-if="store.websiteEmail" class="ms-2">
          {{ store.websiteEmail }}</span
        >
      </div>

      <!-- <LanguageSwitcher /> -->

      <div class="flex flex-row items-center space-x-2">
        <div v-for="(i, ix) in icons" :key="ix" class="mb-1">
          <img
            :src="i.img"
            :alt="i.alt"
            class="h-7 w-12 bg-white border p-1 object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import LanguageSwitcher from '~/components/LanguageSwitcher'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: {
    NuxtLink,
    // LanguageSwitcher
  },
  data() {
    return {
      year: new Date().getFullYear(),
      // popularSearches: null,
      icons: [
        { img: '/img/mastercard-logo.png', alt: 'mastercard' },
        { img: '/img/rupay-logo.png', alt: 'rupay' },
        { img: '/img/visa.png', alt: 'visa' },
        { img: '/img/american.jpg', alt: 'american-express' },
        { img: '/img/paypal-logo-png-transparent.png', alt: 'paypal' },
        { img: '/img/upi-logo.png', alt: 'upi' },
      ],
    }
  },
  // async fetch() {
  // this.getPopularSearches()
  // this.popularSearches = (
  //   await this.$get('search/popularSearches', { sort: '-popularity' })
  // ).data
  // },
  computed: {
    store() {
      return this.$store.state.store || {}
    },
    settings() {
      return this.$store.state.settings || {}
    },
    popularSearches() {
      return this.$store.state.popularSearches || []
    },
  },
  methods: {
    // async getPopularSearches() {
    //   try {
    //     this.loading = true
    //     this.popularSearches = (
    //       await this.$get('search/popularSearches', { sort: '-popularity' })
    //     ).data
    //     // this.popularSearches = (
    //     //   await this.$apollo.query({
    //     //     query: POPULAR_SEARCHES,
    //     //     variables: {
    //     //       sort: '-popularity',
    //     //     },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.popularSearches.data
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
}
</script>
<style scoped>
.icon {
  width: 40px;
  height: 23px;
}
</style>
