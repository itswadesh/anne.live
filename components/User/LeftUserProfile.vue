<template>
  <aside
    class="
      fixed
      lg:stickey lg:top-16
      inset-0
      lg:inset-y-0
      z-30
      flex flex-col
      w-64
      h-full
      overflow-x-hidden overflow-y-auto
      transition
      bg-white
      shadow-md
      border-r
      text-gray-800
    "
  >
    <!-- <LeftOptions /> -->
    <div v-if="ifAccountPages" class="">
      <div class="relative background h-auto w-full bg-cover bg-no-repeat">
        <button
          aria-label="Open sidebar"
          class="
            absolute
            right-0
            top-0
            inline-flex
            items-center
            justify-center
            w-8
            h-8
            rounded
            hover:bg-gray-200
            lg:hidden
            focus:outline-none
          "
          @click="hideSidebar(null)"
        >
          <svg
            class="w-5 h-5 text-primary-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="w-full px-2 py-10 border-b">
          <div v-if="user" class="flex flex-col items-center justify-center">
            <div
              class="
                w-24
                h-24
                border-2 border-gray-300
                rounded-full
                overflow-hidden
                flex
                items-center
                justify-center
                bg-gray-100
              "
            >
              <img
                v-if="!user.avatar"
                src="/leadership-profile.png"
                alt=""
                class="object-cover object-top w-full h-full"
              />
              <img
                v-else
                :src="user.avatar"
                alt=""
                class="object-cover object-top w-full h-full"
              />
            </div>

            <div class="flex flex-col my-auto mt-2 text-lg font-semibold">
              <span class="mb-2 text-center">
                Hello, {{ user && user.firstName }}
              </span>

              <span class="text-sm font-normal text-center text-gray-400">
                {{ user.email }}
              </span>
            </div>
          </div>

          <div v-else class="flex items-center justify-center h-32">
            <p class="text-center font-semibold text-gray-500">
              You have not LoggedIn
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center w-full my-5 text-gray-500">
        <ul class="flex flex-col items-start justify-center w-full mx-auto">
          <!-- dashboard -->
          <li v-for="(i, ix) in dashboardMenuItems" :key="ix" class="w-full">
            <nuxt-link
              v-if="i"
              :to="localePath(i.link)"
              exact-active-class="border-primary-500 bg-primary-100 text-primary-500"
              class="
                flex flex-row
                w-full
                px-4
                py-3
                mx-auto
                ease-in-out
                transform
                cursor-pointer
                border-s-4
                hover:bg-gray-100
                hover:text-primary-500
                hover:border-primary-500
              "
              @click.native="$emit('hideSidebar', true)"
            >
              <h3 class="flex flex-row w-full">
                <span class="w-6 h-6 my-auto me-2" v-html="i.icon" />

                <span class="flex-1 tracking-wider">{{ i.text }}</span>
              </h3>
            </nuxt-link>
          </li>

          <!-- logout -->

          <li class="w-full">
            <button
              type="button"
              class="
                flex flex-row
                w-full
                px-4
                py-3
                mx-auto
                ease-in-out
                transform
                cursor-pointer
                border-s-4
                hover:bg-gray-100
                hover:text-primary-500
                hover:border-primary-500
              "
              @click="Logout"
            >
              <svg
                class="w-6 h-6 my-auto me-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="tracking-wider">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="w-full my-6 text-gray-600">
      <div
        class="uppercase tracking-wider text-lg font-medium text-gray-600 ps-4"
      >
        categories
      </div>

      <ul class="overflow-auto font-light max-h-screen mt-3">
        <li
          v-for="(c, i) in megamenu"
          :key="i"
          class="w-full overflow-hidden border-b tab"
        >
          <input
            :id="'tab-multi-' + i"
            class="absolute opacity-0"
            type="checkbox"
            name="tabs"
          />

          <label
            class="block px-5 py-2 leading-normal cursor-pointer"
            :for="'tab-multi-' + i"
            :class="{
              'text-yellow-500': i % 6 == 0,
              'text-purple-500': i % 6 == 1,
              'text-red-500': i % 6 == 2,
              'text-green-500': i % 6 == 3,
              'text-pink-500': i % 6 == 4,
              'text-blue-500': i % 6 == 5,
            }"
          >
            <nuxt-link :to="slug(c.slug)">
              {{ c.name }}
            </nuxt-link>
          </label>

          <div
            class="
              overflow-hidden
              leading-normal
              bg-gray-100
              border-l-2 border-indigo-500
              tab-content
            "
          >
            <nuxt-link
              v-for="ch in c.children"
              :key="ch.id"
              :to="`/c/${ch.slug}`"
              class="block px-5 py-2 ms-2 hover:font-semibold"
            >
              {{ ch.name }}
            </nuxt-link>
          </div>
        </li>
      </ul>

      <!-- <ul class="flex flex-col items-start justify-center w-full mx-auto">
          <li
            class="w-full mb-2 ms-2"
            v-for="(c, index) in sideMegamenu"
            :key="c.id"
          >
            <nuxt-link
              @click.native="$emit('hideSidebar', true)"
              :to="localePath(`/c/${c.slug}`)"
              exact-active-class="text-primary-500"
              class="w-full"
            >
              <div class="flex flex-row w-full">
                <span
                  class="tracking-wider"
                  :class="{
                    'text-yellow-500': index % 6 == 0,
                    'text-purple-500': index % 6 == 1,
                    'text-red-500': index % 6 == 2,
                    'text-green-500': index % 6 == 3,
                    'text-pink-500': index % 6 == 4,
                    'text-blue-500': index % 6 == 5,
                  }"
                >
                  {{ c.name }}
                </span>
              </div>
              <nuxt-link
                :to="`/c/${ch.slug}`"
                v-for="ch in c.children"
                :key="ch.id"
                class="block ms-4"
              >
                {{ ch.name }}
              </nuxt-link>
            </nuxt-link>
          </li>
        </ul> -->
    </div>
  </aside>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import SIGNOUT from '~/gql/user/signOut.gql'
import GET_MEGAMENU from '~/gql/category/megamenu.gql'
import BRAND from '~/gql/brand/brand.gql'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },
  props: {
    show: { type: Boolean },
  },
  data() {
    return {
      brandPresent: false,
      brand: null,
      dashboardMenuItems: [
        {
          link: '/my',
          text: 'Dashboard',
          description:
            'All Orders, tracking orders, return items, manage orders.',
          icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
              clip-rule="evenodd"
            />
          </svg>`,
        },
        {
          link: '/my/orders',
          text: 'My Orders',
          description:
            'All Orders, tracking orders, return items, manage orders.',
          icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            />
          </svg>`,
        },
        {
          link: '/my/profile',
          text: 'Profile Information',
          description:
            'Edit Login Details, password setup, Edit fisrt and last name, number',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                 </svg>`,
        },
        {
          link: '/my/wishlist',
          text: 'Wishlist',
          description: 'Wishlist',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                 <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                 </svg>`,
        },
        {
          link: '/my/reviews',
          text: 'My Reviews',
          description: 'product reviews',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                 <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                 </svg>`,
        },
        {
          link: '/my/manage-address',
          text: 'Manage Address',
          description: 'product reviews',
          icon: `<svg xmlns="http://www.w3.org/2000/svg"" viewBox="0 0 20 20" fill="currentColor">
                 <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                 </svg>`,
        },
        //         {
        //           link: '/my/demo-requests',
        //           text: 'Demo Requests',
        //           description: 'All your prime demo requests',
        //           icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        //   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        // </svg>`,
        //         },
        // {
        //   link: '/',
        //   text: 'Payments',
        //   description:
        //     'Edit login details, password setup, edit fist and last name, number.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     stroke="currentColor"
        //   >
        //     <path
        //       stroke-linecap="round"
        //       stroke-linejoin="round"
        //       stroke-width="2"
        //       d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        //     />
        //   </svg>`,
        // },
        // {
        //   role: 'user',
        //   link: '/my/giftcards',
        //   text: 'Gift Cards',
        //   description: 'Manage GIft cards, use cards Redeem and refer to earn.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 20 20"
        //     fill="currentColor"
        //   >
        //     <path
        //       fill-rule="evenodd"
        //       d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
        //       clip-rule="evenodd"
        //     />
        //     <path
        //       d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
        //     />
        //   </svg>`,
        // },
        // {
        //   role: 'admin',
        //   link: '/my/credits',
        //   text: 'Creadit Points',
        //   description:
        //     'Manage your earn points, redeem, share, refer to earn points.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     stroke="currentColor"
        //   >
        //     <path
        //       stroke-linecap="round"
        //       stroke-linejoin="round"
        //       stroke-width="2"
        //       d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
        //     />
        //   </svg>`,
        // },
        // {
        //   role: 'user',
        //   link: '/my/profile',
        //   text: 'Notifications',
        //   description: 'Manage, delete, schedule your Notifications.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 20 20"
        //     fill="currentColor"
        //   >
        //     <path
        //       d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
        //     />
        //   </svg>`,
        // },
      ],
      // categories: [],
      selectedCategory: null,
      dashboard: false,
      profile: false,
      wishlist: false,
      card: false,
      review: false,
      sideMegamenu: null,
      signOut: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
    user() {
      return this.$store.state.auth.user
    },
    ifAccountPages() {
      const currPath = this.$router.currentRoute.path
      return currPath.includes('/my')
    },
  },
  // watch: {
  //   $route(to, from) {
  //     this.refreshSideMegaMenu()
  //   },
  // },
  // created() {
  //   this.refreshSideMegaMenu()
  // },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    ...mapActions({ logout: 'auth/logout' }),
    slug(cSlug) {
      let url = `/c/${cSlug}`
      if (this.brand) url = `/c/${cSlug}?brand=${this.brand.id}`
      return this.localePath(url)
    },
    // async refreshSideMegaMenu() {
    //   try {
    //     let brand = null
    //     const bv = {}
    //     const slug = this.$route.params.slug
    //     const brandId = this.$route.query.brand
    //     if (brandId) bv.id = brandId
    //     else if (slug) bv.slug = slug
    //     try {
    //       if (bv.id || bv.slug) {
    //         this.brand = brand = await this.$get('brand/brand', bv)
    //         // this.brand = brand = (
    //         //   await this.$apollo.query({
    //         //     query: BRAND,
    //         //     variables: bv,
    //         //   })
    //         // ).data.brand
    //       }
    //     } catch (e) {}
    //     const variables = {}
    //     // if (this.$route.path.includes('/brand/') || (brand && brand.id)) {
    //     if (brand && brand.id) variables.brand = brand.id
    //     if (slug && !this.$route.path.includes('/brand/')) variables.slug = slug
    //     // console.log('aaaaaaaaaaaaaaaa', variables)
    //     this.sideMegamenu = await this.$get('category/megamenu', variables)
    //     // this.sideMegamenu = (
    //     //   await this.$apollo.query({
    //     //     query: GET_MEGAMENU,
    //     //     variables,
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.megamenu
    //   } catch (e) {}
    // },
    // async getCategories() {
    // console.log('get categories')
    // try {
    //   this.categories = (
    //     await this.$apollo.query({
    //       query: GET_MEGAMENU,
    //       variables: { level: 0 },
    //       fetchPolicy: 'no-cache',
    //     })
    //   ).data.megamenu
    //   // console.log(this.categories, 'categories')
    // } catch (e) {
    //   // console.log(e)
    // } finally {
    //   }
    // },
    go(url) {
      this.$emit('hideSidebar', true)
      this.$router.push(`${url}`)
    },
    hideSidebar(e) {
      this.sidebar = false
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hideSidebar', true)
    },
    onSelectCategory(val) {
      this.selectedCategory = val
    },
    async Logout() {
      const msg = 'successfully logged out'
      try {
        await this.logout({ mutation: SIGNOUT })
        this.success(msg)
      } catch (e) {}
    },
  },
}
</script>
<style scoped>
.background {
  background-image: url('/sidebar-background.jpg');
}
.center-text {
  position: relative;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
.tab-content {
  max-height: 0;
  -webkit-transition: max-height 0.35s;
  -o-transition: max-height 0.35s;
  transition: max-height 0.35s;
}
.tab input:checked ~ .tab-content {
  max-height: 100vh;
}
.tab input[type='checkbox'] + label.has::after {
  content: '\25BE';
}
.frosted {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
