<template>
  <button
    v-if="scrolled > 1000"
    class="
      fixed
      bottom-0
      right-0
      z-10
      flex
      items-center
      w-8
      h-8
      mb-3
      text-xl text-center text-gray-900
      bg-gray-300
      border border-gray-600
      rounded-full
      shadow-lg
      outline-none
      cursor-pointer
      me-3
      focus:outline-none
      hover:bg-gray-600 hover:text-white
    "
    @click="scrollToTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-4 m-2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </button>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      shouldShow: false,
      scrolled: 0,
    }
  },
  mounted() {
    if (process.client) {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY
      })
    }
  },
  methods: {
    scrollToTop() {
      if (process.client) {
        window.scroll({ behavior: 'smooth', left: 0, top: 100 })
      }
    },
  },
}
</script>
