<template>
  <header class="fixed z-20 w-full shadow-lg frosted">
    <nav
      class="
        container
        mx-auto
        flex flex-row flex-wrap
        justify-between
        items-center
        px-2
        sm:px-10
        py-3
      "
    >
      <nuxt-link to="/" class="flex items-center me-5">
        <img
          v-if="store.logo"
          v-lazy="`${store.logoCdn || store.logo}?tr=h-80,fo-auto`"
          alt=""
          class="object-contain h-12 md:h-16"
        />
      </nuxt-link>

      <div class="flex items-center">
        <nuxt-link
          to="/"
          class="
            lg:text-lg
            font-semibold
            me-5
            text-primary-500
            border-b-2
            sm:border-b-4
            border-transparent
            hover:border-primary-500
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
        >
          Live Now
        </nuxt-link>

        <nuxt-link
          to="/videos"
          class="
            lg:text-lg
            font-semibold
            text-primary-500
            border-b-2
            sm:border-b-4
            border-transparent
            hover:border-primary-500
            focus:outline-none focus:ring-0 focus:ring-offset-0
          "
        >
          Stored Videos
        </nuxt-link>
      </div>

      <div v-if="geo" class="flex text-sm">
        <div v-if="errorStr">
          Sorry, but the following error occurred: {{ errorStr }}
        </div>

        <div v-if="gettingLocation">
          <i>Getting your location...</i>
        </div>

        <nuxt-link to="/change-location" class="flex items-center ps-2 rounded">
          {{ geo.city }}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtLink from '../NuxtLink.vue'
import { location } from '~/shared/mixins'

export default {
  components: { NuxtLink },
  mixins: [location],
  data() {
    return {
      cls: '',
      errorStr: null,
      geo: null,
      gettingLocation: false,
    }
  },

  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    },

    cart() {
      return this.$store.state.cart || {}
    },

    ...mapGetters({
      showCart: 'cart/showCart',
      store: 'store',
    }),
  },

  mounted() {
    if (process.client) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY
        this.cls = scrolled > 147 ? 'fix-search' : ''
      })
    }
    try {
      // this.geo = this.$cookies.get('geo')
      // if (!this.geo && process.client) {
      //   this.$router.push('/change-location')
      // }
    } catch (e) {
      this.errorStr = e
    } finally {
      this.gettingLocation = false
    }
  },

  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId)
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop - 100,
      })
    },

    submit(q) {
      this.$router.push(`/search/${q}`)
    },

    closeSidebar() {
      this.sidebar = false
    },

    logout() {
      this.$store.dispatch('auth/logout').then(() => {})
    },

    go(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}

.blur {
  backdrop-filter: saturate(180%) blur(5px);
}

.desktop-badge {
  font-size: 8px;
  right: -6px;
  top: -6px;
  height: 15px;
  width: 14px;
  border-radius: 50%;
  display: inline-block;
}

.desktop-badge .number {
  margin-top: 1.5px;
  margin-left: -1px;
}

.fix-search {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  padding: 10px;
  z-index: 100;
  margin: 0px;
}
</style>
