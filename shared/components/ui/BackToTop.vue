<template>
  <button
    v-if="scrolled > 1000"
    class="
      fixed
      top-0
      z-50
      w-24
      h-8
      m-4
      text-sm
      font-medium
      text-center
      rounded-lg
      shadow-lg
    "
    @click="toTop"
  >
    Back To Top
    <svg
      class="w-5 h-5 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
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
  data() {
    return {
      shouldShow: true,
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
    toTop() {
      if (process.client) {
        window.scrollTo(0, 0)
      }
    },
  },
}
</script>
