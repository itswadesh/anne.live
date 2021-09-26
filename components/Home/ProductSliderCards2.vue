<template>
  <section class="flex-shrink-0">
    <div
      class="
        w-1/2
        border
        sm:border-0 sm:w-52 sm:mr-2 sm:mb-2
        md:mr-4 md:mb-4
        group
        hover:bg-white hover:shadow-md
        text-gray-800
      "
      @mouseenter="showitems()"
      @mouseleave="hideitems()"
    >
      <nuxt-link
        :to="localePath(`/${product.slug}?id=${product.id}`)"
        class="block overflow-hidden"
      >
        <div class="">
          <img
            v-lazy="product.img"
            alt="product.name"
            class="object-cover object-top w-full h-72 bg-black"
          />
        </div>

        <div class="p-4">
          <!-- For view above 640px start -->

          <div v-if="show" class="-mt-12 hidden sm:block">
            <!-- View smilar button start-->
            <nuxt-link to="#" class="flex justify-end">
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
            <button
              class="
                mt-3.5
                py-1
                w-full
                border border-gray-300
                hover:bg-gray-100
                flex
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
            </button>
            <!-- Wishlist end-->

            <!-- Size chart start-->
            <div class="mt-1.5 flex items-baseline justify-start">
              <h5 class="mr-1 text-sm">Sizes:</h5>
              <!-- <h6  class="space-x-1 text-xs font-medium text-gray-500 flex items-baseline ">
						
									<div>{v.size}</div>
						
						</h6> -->
            </div>
            <!-- Size chart end-->

            <!-- For view above 640px end -->

            <!-- For view below 640px start -->

            <div class="sm:hidden">
              <div class="flex items-center justify-between">
                <h4 class="font-semibold mb-1.5">
                  <span v-if="product.brand"> {{ product.brand }}</span>
                  <span v-else> _ </span>
                </h4>

                <!-- Heart icon start  -->
                <div class="sm:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
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
                </div>
                <!-- Heart icon end  -->
              </div>

              <h5
                class="
                  text-sm
                  font-medium
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
            <h4 class="font-semibold mb-1.5">
              <span v-if="product.brand"> {{ product.brand }}</span>
              <span v-else> _ </span>
            </h4>

            <h5
              class="
                text-sm
                font-medium
                overflow-hidden
                whitespace-nowrap
                overflow-ellipsis
              "
            >
              <span v-if="product.name"> {{ product.name }}</span>

              <span v-else> _</span>
            </h5>
          </div>

          <div
            class="
              mt-2.5
              mb-1.5
              leading-4
              flex flex-wrap
              items-baseline
              justify-start
            "
          >
            <h6 class="mr-1 text-xs sm:text-sm font-semibold whitespace-nowrap">
              {{ product.price | currency(store.currencySymbol, 2) }}
            </h6>

            <h6
              v-if="product.price < product.mrp"
              class="mr-1 text-xs text-gray-500 whitespace-nowrap line-through"
            >
              {{ product.mrp | currency(store.currencySymbol, 2) }}
            </h6>

            <div
              v-if="product.price < product.mrp"
              class="mr-1 text-xs text-primary-800 whitespace-nowrap"
            >
              <h6 class="hidden sm:block">{{ product.discount }}% off</h6>
            </div>

            <div v-if="product.stock < 1" class="text-xs text-red-500">
              Out of stock
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
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
</style>
