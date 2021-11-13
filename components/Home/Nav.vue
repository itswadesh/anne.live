<template>
  <section class="flex flex-col bg-white shadow frosted">
    <div
      v-if="!settings.id"
      class="
        px-4
        py-2
        font-light
        text-center
        bg-gray-800
        text-white text-sm
        tracking-wider
      "
    >
      We are upgrading. Will not take much time.
    </div>

    <header class="z-40 w-full p-2 lg:p-3 shadow-xs sm:shadow-md">
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center">
          <button
            aria-label="Open Menu"
            class="
              lg:hidden
              focus:outline-none focus:ring-0 focus:ring-offset-0
            "
            @click="sidebar = !sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 text-primary-500 me-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            v-if="sidebar"
            class="
              fixed
              inset-0
              z-30
              w-screen
              h-screen
              bg-black
              opacity-50
              cursor-auto
            "
            @click="sidebar = false"
          />

          <LeftUserProfile
            class="h-screen"
            :show="sidebar"
            :class="sidebar ? 'openSideBar' : 'closeSideBar'"
            @hideSidebar="sidebar = false"
          />
          <nuxt-link :to="localePath('/')">
            <img
              v-if="store.logo"
              v-lazy="`${store.logoCdn || store.logo}?tr=h-80,fo-auto`"
              alt=""
              class="object-contain h-10 lg:h-16"
            />

            <h1
              v-else
              class="
                h-10
                lg:h-16
                w-28
                lg:w-40
                flex
                items-center
                text-start text-lg
                lg:text-2xl
                text-transparent
                bg-clip-text bg-gradient-to-br
                from-primary-500
                to-secondary-500
                font-semibold
                sm:font-bold
                overflow-hidden
                whitespace-nowrap
                overflow-ellipsis
              "
            >
              <span>{{ store.name }}</span>
            </h1>
          </nuxt-link>
        </div>

        <!-- <SearchAutocomplete class="hidden lg:block" /> -->

        <!--right header with icons block start -->

        <div
          class="
            my-auto
            flex
            items-center
            justify-between
            flex-shrink-0
            ms-10
            me-1
            max-w-max
            space-x-5
          "
        >
          <button
            v-if="!user"
            class="focus:outline-none focus:ring-0 focus:ring-offset-0"
            aria-label="Login"
            @click="findLoginScreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>

            <div class="hidden text-sm lg:block">Login</div>
          </button>

          <nuxt-link v-else class="w-auto" :to="localePath('/my')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>

            <div class="hidden text-sm lg:block">Profile</div>
          </nuxt-link>
        </div>

        <!--right header with icons block end -->
      </div>

      <!-- <SearchAutocomplete class="lg:hidden" /> -->
    </header>
  </section>
</template>

<script>
// import CART from '~/gql/cart/cart.gql'
// import SearchAutocomplete from '~/components/SearchAutocomplete.vue'
import LeftUserProfile from '~/components/User/LeftUserProfile.vue'

export default {
  components: {
    // SearchAutocomplete,
    LeftUserProfile,
  },

  props: {
    msg: { type: String, default: null },
  },

  data() {
    return {
      sidebar: false,
      showLogin: false,
    }
  },

  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return (this.$store.state.auth || {}).user
    },
    cart() {
      return this.$store.state.cart
    },
    store() {
      return this.$store.state.store || {}
    },
  },

  // async created() {
  // console.log(this.user)
  // console.log(this.$router.path.name)
  // console.log(this.cart, 'nnnnnnnnnnnnnn')
  // await this.getCart()
  // },

  methods: {
    findLoginScreen() {
      if (this.settings.topLogin) {
        this.$emit('showLogin', true)
      } else {
        this.$router.push('/login')
      }
    },

    // showLogin() {
    //   if (!this.user) {
    //     this.$router.push('/login')
    //   }
    // },

    hideOffers() {
      // console.log("hide offers")
      // this.showLogin = false
    },

    // async getCart() {
    //   console.log('add to tt', this.cart)
    //   try {
    //     this.cart = (
    //       await this.$apollo.query({
    //         query: CART,
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.cart
    //     console.log('add to carttttttt', this.cart)
    //   } catch (e) {
    //     console.log(e)
    //   } finally {
    //   }
    // },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.frosted {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}

.text-sm {
  font-size: 0.675rem;
  line-height: 1.1rem;
  margin-left: 1px;
}

.openSideBar {
  left: 0;
  transition: 0.3s all;
}
.closeSideBar {
  left: -100%;
  transition: 0.3s all;
}
</style>
