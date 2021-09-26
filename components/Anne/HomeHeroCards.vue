<template>
  <div
    v-if="product"
    :id="product.id"
    class="container w-full mx-auto my-5 lg:my-20"
  >
    <nuxt-link
      :to="product.link"
      rel="prefetch"
      class="flex flex-col-reverse lg:flex-row"
    >
      <!-- Data section start  -->
      <div
        class="flex-1 max-w-md lg:mx-auto mt-5 lg:w-1/2 lg:mt-0"
        :class="ix % 2 == !0 ? 'lg:order-2 ms-auto' : 'mx-6'"
      >
        <div class="mx-4">
          <button
            class="
              px-6
              py-3
              text-center text-white
              rounded-md
              shadow
              focus:outline-none
              bg-primary-500
              hover:shadow
            "
          >
            {{ product.title }}
          </button>

          <div class="my-8">
            <div class="text-lg font-bold">{{ product.name }}</div>

            <div class="my-5 text-sm text-gray-600 lg:text-base">
              <ul>
                <li
                  v-for="(i, ixx) in product.description"
                  :key="ixx"
                  class="flex items-start py-1"
                >
                  <div
                    class="
                      w-2
                      h-2
                      lg:w-3 lg:h-3
                      mt-1.5
                      me-2
                      rounded-full
                      bg-primary-500
                    "
                  ></div>
                  <span class="flex-1">{{ i.info }}</span>
                </li>
              </ul>
            </div>
            <div class="text-lg font-bold lg:text-2xl text-primary-500">
              {{ product.footer }}
            </div>
          </div>
        </div>
      </div>
      <!-- Data section end -->
      <!-- Image section start  -->
      <div
        class="lg:w-1/2"
        :class="ix % 2 == !0 ? '' : 'lg:order-1 ms-auto  max-w-max'"
      >
        <img
          v-lazy="product.img"
          class="
            md:h-96
            object-top object-cover
            transition
            duration-700
            transform
            hover:scale-105
          "
        />
      </div>
      <!-- Image section end -->
    </nuxt-link>
  </div>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    product: { type: Object, default: null },
    ix: { type: Number, default: 0 },
  },
}
</script>

<style scoped></style>
