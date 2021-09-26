<template>
  <div class="relative" @click="animate">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 text-red-500 transform active:scale-105 cursor-pointer"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clip-rule="evenodd"
      />
    </svg>
    <div
      v-if="animated"
      :class="{ 'animate-float': animated }"
      class="absolute bottom-0"
      @animationend="animated = false"
    >
      <div class="animate-wiggle">
        <button type="button" class="animate-scale">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-red-500 animate-fade"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animated: false,
    }
  },
  methods: {
    animate() {
      this.animated = true
      setTimeout(() => (this.animated = false), 6000)
    },
  },
}
</script>
<style scoped></style>
