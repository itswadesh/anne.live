<template>
  <div class="w-full mx-auto mt-12 bg-gray-100 border-b">
    <ul class="container flex flex-row justify-center mx-auto text-sm">
      <li
        v-for="(category, index) in megamenu"
        :key="category.id"
        class="
          h-auto
          mx-1
          my-auto
          border-b-4 border-gray-100
          cursor-pointer
          hoverable
        "
        :class="{
          'hover:border-yellow-500 ': index % 6 == 0,
          'hover:border-purple-500': index % 6 == 1,
          'hover:border-red-500 ': index % 6 == 2,
          'hover:border-green-500 ': index % 6 == 3,
          'hover:border-pink-500 ': index % 6 == 4,
          'hover:border-blue-500 ': index % 6 == 5,
        }"
      >
        <nuxt-link
          :to="localePath(`/c/${category.slug}`)"
          class="
            relative
            flex flex-row
            items-center
            flex-shrink-0
            p-2
            py-3
            mx-auto
            my-auto
            text-sm
            font-light
            text-gray-600
          "
          :class="{
            'hover:text-yellow-500 ': index % 6 == 0,
            'hover:text-purple-500': index % 6 == 1,
            'hover:text-red-500 ': index % 6 == 2,
            'hover:text-green-500 ': index % 6 == 3,
            'hover:text-pink-500 ': index % 6 == 4,
            'hover:text-blue-500 ': index % 6 == 5,
          }"
        >
          {{ category.name }}
          <!-- chevron-down-icon -->
          <svg
            v-if="category.children != 0"
            class="w-4 h-4 my-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </nuxt-link>
        <div
          class="w-auto mx-auto mt-1 mb-16 bg-white shadow-xl mega-menu sm:mb-0"
        >
          <div class="flex justify-start w-full mx-auto">
            <ul
              v-for="(c, ix) in category.children"
              :key="ix"
              class="
                w-full
                px-4
                pt-6
                pb-6
                border-b border-gray-600
                sm:w-1/2
                text-1
                lg:w-1/5 lg:border-b-0 lg:pt-3
              "
              :class="{ 'bg-gray-50': Math.abs(ix % 2) }"
            >
              <nuxt-link :to="localePath(`/c/${c.slug}`)" class="flex">
                <div
                  class="flex items-center mb-1 font-bold"
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
                </div>
              </nuxt-link>
              <div class="flex py-1 text-sm font-light text-start">
                <ul>
                  <li
                    v-for="(c1, ixx) in c.children"
                    :key="ixx"
                    class="py-1 text-gray-600"
                  >
                    <nuxt-link :to="localePath(`/c/${c1.slug}`)">
                      <span
                        class="w-56 truncate hover:font-bold"
                        :class="{
                          'hover:text-pink-500': ixx % 12 == 1,
                          'hover:text-yellow-400': ixx % 12 == 1,
                          'hover:text-purple-400': ixx % 12 == 2,
                          'hover:text-red-400': ixx % 12 == 3,
                          'hover:text-green-400': ixx % 12 == 4,
                          'hover:text-blue-400': ixx % 12 == 5,
                          'hover:text-yellow-600': ixx % 12 == 6,
                          'hover:text-purple-600': ixx % 12 == 7,
                          'hover:text-red-600': ixx % 12 == 8,
                          'hover:text-green-600': ixx % 12 == 9,
                          'hover:text-pink-600': ixx % 12 == 10,
                          'hover:text-blue-600': ixx % 12 == 11,
                        }"
                      >
                        {{ c1.name }}</span
                      >
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </li>
      <!-- <li
        class="
          h-auto
          py-3
          mx-1
          my-auto
          text-base
          font-light
          text-gray-600
          border-b-4 border-gray-100
          cursor-pointer
          hover:border-black hover:text-black
          hoverable
        "
      >
        <div class="flex flex-row my-auto">
          <p>Brands</p>
          <svg
            class="w-4 h-4 my-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div
          class="w-auto mx-auto mt-5 mb-16 bg-white shadow-xl mega-menu sm:mb-0"
        >
          <div
            v-if="parentBrands"
            class="container flex flex-wrap px-2 lg:px-8 justify-center"
          >
            <div v-for="b in parentBrands.data" :key="b.id" class="py-4 mx-6">
              <nuxt-link :to="localePath(`/brand/${b.slug}`)" class="p-3">
                <img
                  v-if="b.img"
                  v-lazy="b.img"
                  alt="bab"
                  class="object-contain h-16"
                />
                <div
                  v-else
                  class="
                    h-16
                    w-16
                    flex
                    justify-center
                    items-center
                    text-center
                    my-auto
                    text-primary-500
                    font-semibold
                    rounded-full
                    border-2 border-primary-500
                    text-2xl
                  "
                >
                  {{ b.name | first }}
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import PARENT_BRANDS from '~/gql/brand/parentBrands.gql'
// import MEGAMENU from '~/gql/category/megamenu.gql'
// import BRAND from '~/gql/brand/brand.gql'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { NuxtLink },
  props: {
    brand: { type: String, default: null },
  },
  data() {
    return {
      // megamenu: null,
      parentBrands: false,
    }
  },
  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
  },
  created() {
    // this.getMegamenu()
    // this.getParentBrands()
  },
  methods: {
    // async getMegamenu() {
    //   // this.loading = true
    //   try {
    //     const brand = await this.$get('brand/brand', {
    //       slug: this.$route.params.slug,
    //     })
    //     // const brand = (
    //     //   await this.$apollo.query({
    //     //     query: BRAND,
    //     //     variables: { slug: this.$route.params.slug },
    //     //   })
    //     // ).data.brand
    //     const variables = { active: true }
    //     if (this.brand) {
    //       variables.brand = brand.id
    //     }
    //     this.megamenu = await this.$get('category/megamenu', variables)
    //     // this.megamenu = (
    //     //   await this.$apollo.query({
    //     //     query: MEGAMENU,
    //     //     variables,
    //     //   })
    //     // ).data.megamenu
    //   } catch (e) {}
    // },
    // async getParentBrands() {
    //   // this.loading = true
    //   try {
    //     this.parentBrands = await this.$get('brand/parentBrands', {
    //       featured: true,
    //       limit: 30,
    //       page: 0,
    //     })
    //     // this.parentBrands = (
    //     //   await this.$apollo.query({
    //     //     query: PARENT_BRANDS,
    //     //     variables: { featured: true, limit: 30, page: 0 },
    //     //     fetchPolicy: 'no-cache',
    //     //   })
    //     // ).data.parentBrands
    //     // console.log("brands to show", this.brands)
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     // this.loading = false
    //   }
    // },
  },
}
</script>

<style scoped>
.mega-menu {
  visibility: hidden;
  transition: 0.2s 0.1s; /* delay of 1 seconds on hover off */
  opacity: 0;
  left: 0;
  position: absolute;
  text-align: left;
  width: 100%;
  z-index: 9999;
}

/* #hoverable Class Styles
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
.hoverable {
  position: static;
}

.hoverable > a::after {
  padding-left: 6px;
  position: relative;
}

.hoverable:hover .mega-menu {
  visibility: visible;
  opacity: 1;
  transition-delay: 0.1s;
}
</style>
