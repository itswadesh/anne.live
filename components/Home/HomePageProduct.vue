<template>
  <section
    v-if="product"
    class="w-full border group hover:bg-white hover:shadow-md text-gray-800"
    @mouseenter="showitems()"
    @mouseleave="hideitems()"
  >
    <nuxt-link
      :to="localePath(`/${product.slug}?id=${product.id || pid}`)"
      class="block overflow-hidden"
    >
      <div class="h-48 sm:h-72 bg-gray-100">
        <img
          v-lazy="product.img"
          alt="product"
          class="object-contain w-full h-full"
        />
      </div>

      <div class="p-2 sm:p-4">
        <!-- For view above 640px start -->

        <div v-if="show" class="sm:-mt-12">
          <!-- View smilar button start-->
          <div class="hidden sm:block">
            <nuxt-link
              :to="`/search/${product.brand && product.brand.name}`"
              class="flex justify-end"
            >
              <div
                class="
                  flex
                  items-center
                  bg-white
                  text-primary-500
                  h-7
                  w-7
                  rounded-full
                  border border-primary-500
                  trans
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  ></path>
                </svg>
                <span class="ps-2 text-xs whitespace-nowrap">View similar</span>
              </div>
            </nuxt-link>
            <!-- View smilar button end-->

            <!-- Wishlist start-->
            <div class="h-rem w-full"></div>
            <!-- <button
              class="
                z-30
                flex
                mt-3.5
                py-1
                w-full
                border border-gray-300
                hover:bg-gray-100
                transition
                duration-300
                items-center
                justify-center
                space-x-2
                focus:outline-none
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path></svg
              ><span class="text-sm font-semibold">WISHLIST</span>
            </button> -->
            <!-- Wishlist end-->

            <!-- Size chart start-->
            <div
              class="
                flex
                mt-1.5
                items-baseline
                justify-start
                overflow-hidden
                whitespace-nowrap
                overflow-ellipsis
              "
            >
              <h5 class="mr-1 text-sm">Sizes:</h5>
              <h6 class="space-x-1 text-xs text-gray-500 flex items-baseline">
                <div
                  v-if="pg && pg.sizeGroup && pg.sizeGroup.length"
                  class="font-medium"
                >
                  <span v-for="(s, sx) in pg.sizeGroup" :key="sx + 's'">
                    {{ s.size.nam }}
                  </span>
                </div>

                <div v-else class="font-light truncate">Not available</div>
              </h6>
            </div>

            <!-- Size chart end-->
          </div>

          <!-- For view above 640px end -->

          <!-- For view below 640px start -->

          <div class="block sm:hidden">
            <div class="flex items-center justify-between mb-1.5">
              <h4 class="text-sm font-semibold">
                <span v-if="product.brand"> {{ product.brand.name }}</span>
                <span v-else> _ </span>
              </h4>

              <!-- Heart icon start  -->

              <!-- <button class="z-30 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </button> -->

              <!-- Heart icon end  -->
            </div>

            <h5
              class="
                text-xs
                sm:text-sm
                font-light
                sm:font-normal
                text-gray-500
                overflow-hidden
                whitespace-nowrap
                overflow-ellipsis
              "
            >
              <span v-if="product.name"> {{ product.name }}</span>

              <span v-else> _</span>
            </h5>
          </div>
        </div>

        <!-- For view below 640px end -->

        <div v-else>
          <div class="flex items-center justify-between mb-1.5">
            <h4 class="text-sm sm:text-base font-semibold">
              <span v-if="product.brand"> {{ product.brand.name }}</span>
              <span v-else> _ </span>
            </h4>

            <!-- Heart icon start  -->
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 sm:h-5 sm:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg> -->
            <!-- Heart icon end  -->
          </div>

          <h5
            class="
              text-xs
              sm:text-sm
              font-light
              sm:font-normal
              text-gray-500
              overflow-hidden
              whitespace-nowrap
              overflow-ellipsis
            "
          >
            <span v-if="product.name"> {{ product.name }}</span>

            <span v-else> _</span>
          </h5>
        </div>

        <!-- Price section for all view start -->
        <div
          class="
            mt-1.5
            sm:mt-2.5
            mb-1
            sm:mb-1.5
            leading-4
            flex flex-row
            overflow-hidden
            whitespace-nowrap
            overflow-ellipsis
            items-baseline
            justify-start
          "
        >
          <h6 class="mr-1 sm:mr-1.5 text-sm font-semibold whitespace-nowrap">
            {{ product.price | currency(store.currencySymbol) }}
          </h6>

          <h6
            v-if="product.price < product.mrp"
            class="
              mr-1
              sm:mr-1.5
              text-xs text-gray-500
              font-light
              whitespace-nowrap
              line-through
            "
          >
            {{ product.mrp | currency(store.currencySymbol) }}
          </h6>

          <div
            v-if="product.price < product.mrp"
            class="
              text-xs text-secondary-200
              font-light
              whitespace-nowrap
              truncate
            "
          >
            ({{ product.discount }}% off)
          </div>
        </div>

        <!-- Price section for all view end -->

        <div v-if="product.stock < 1" class="text-xs text-red-500">
          Out of stock
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
// import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
export default {
  // computed:{
  //   bgColor(){
  //     return{
  //       "background-color": this.bgColor,
  //     };
  //   }
  // },
  components: { NuxtLink },
  // ['id', 'slug', 'name', 'price', 'img'],
  props: {
    product: { type: Object, default: () => {} },
    pid: { type: String, default: null },
    pg: { type: Object, default: null },
  },
  data() {
    return {
      isActive: false,
      // isWishlist:false,
      products: null,
      show: false,
    }
  },
  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },
  methods: {
    ...mapMutations({ setErr: 'setErr', success: 'success' }),

    showitems() {
      this.show = true
    },

    hideitems() {
      this.show = false
    },

    // async toggleWishlist(id) {
    //   // console.log(id)
    //   this.isActive = true
    //   const msg = 'Product Added To the Wishlist'
    //   // console.log(id)
    //   try {
    //     const data = (
    //       await this.$apollo.mutate({
    //         mutation: TOGGLE,
    //         variables: {
    //           product: id,
    //           variant: id,
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.toggleWishlist
    //     this.success(msg)
    //     // console.log('add to wishlist', this.toggleWishlist)
    //   } catch (e) {
    //     // console.log(e)
    //     this.setErr(e.toString())
    //     this.$router.push('/login')
    //     // console.log(e)
    //   }
    // },
  },
}
</script>

<style scoped>
.trans {
  transition: width 0.3s;
  overflow: hidden;
  justify-content: start;
  padding-left: 2px;
}
.trans:hover {
  width: 130px;
  padding-left: 0px;
  justify-content: center;
}
.h-rem {
  height: 2.75rem;
}
</style>
