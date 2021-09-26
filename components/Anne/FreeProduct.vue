<template>
  <div v-if="product" class="w-40 m-1.5 overflow-hidden md:w-72">
    <nuxt-link
      to="/"
      rel="prefetch"
      class="block bg-white rounded-md shadow-md avatar zoom hover:shadow-lg"
    >
      <button
        class="
          w-full
          py-3
          text-center text-white
          rounded-t-md
          bg-primary-500
          hover:bg-gray-200 hover:text-primary-500
        "
      >
        {{ product.heading }}
      </button>
      <img src="" class="object-cover object-top w-full h-40 md:h-60" />
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold truncate">{{ product.name }}</div>
        <div class="flex justify-between mb-2 text-base text-gray-600 truncate">
          by Ratings
        </div>
        <div class="flex items-center justify-between text-base">
          <div class="text-2xl font-bold">FREE</div>
          <nuxt-link to="" class="download primary"> </nuxt-link>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    product: { type: Object, default: null },
  },
}
</script>
