<template>
  <div v-if="product" class="w-full p-3">
    <nuxt-link
      :to="product.link"
      rel="prefetch"
      class="
        flex-1
        block
        p-4
        bg-white
        border-b-8 border-white
        rounded-md
        shadow
        lg:p-10
        avatar
        hover:border-primary-500
        zoom
        hover:shadow-md
      "
    >
      <img v-lazy="product.img" class="h-40 mx-auto" />
      <div class="">
        <div class="my-5 text-xl font-bold text-center lg:text-2xl">
          {{ product.name }}
        </div>
        <div
          class="mb-2 text-sm text-center text-gray-600 lg:text-base"
          v-html="product.description"
        ></div>
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

<style scoped></style>
