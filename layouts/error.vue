<template>
  <section
    class="container max-w-7xl mx-auto px-2 md:px-10 h-screen text-gray-700"
  >
    <div
      class="
        flex flex-col
        p-6
        items-center
        justify-center
        text-center
        tracking-wide
      "
    >
      <div class="max-w-max">
        <span class="mb-5 font-semibold text-red-500">ERROR! </span>

        <img
          v-if="error.statusCode === 404"
          v-lazy="'/no/404-error-animate.svg'"
          alt="404 Error"
          class="object-contain h-80 md:h-96"
        />

        <img
          v-else
          v-lazy="'/no/search-animate.svg'"
          alt="404 Error"
          class="object-contain h-80 md:h-96"
        />

        <div
          class="
            px-4
            py-2
            mt-5
            text-red-500
            bg-red-200
            border border-red-300
            font-semibold
            text-sm
            md:text-base
          "
        >
          {{ error.message }}
        </div>
      </div>

      <nuxt-link to="/" class="px-4 py-2 mt-5 text-sm rounded hover:underline">
        {{ store.name }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    error: { type: Object, default: null },
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      ...i18nHead,
      title: `Error Occured - ${this.store.name}`,
    }
  },
  computed: {
    store() {
      return this.$store.state.store || {}
    },
  },
}
</script>

<style scoped>
h1 {
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
