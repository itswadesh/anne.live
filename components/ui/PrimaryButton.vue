<template>
  <button
    v-bind="$attrs"
    class="
      flex
      items-center
      justify-center
      px-4
      py-2
      space-x-1
      font-semibold
      text-white
      tracking-wide
      transition
      duration-300
      transform
      shadow-md
      sm:rounded-md
      active:scale-95
      hover:shadow hover:bg-opacity-80
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    "
    :class="
      loading
        ? ' bg-gray-400 border-gray-400 cursor-not-allowed'
        : 'bg-primary-500'
    "
    :disabled="loading"
    @click="$emit('click')"
  >
    <div v-if="!loading" class="flex items-center justify-center space-x-1">
      <slot></slot>
    </div>

    <div v-else>
      <svg
        class="mx-auto text-white animate-spin"
        :class="{
          'w-4 h-4': loadingringsize == 'xs',
          'h-5 w-5': loadingringsize == 'sm',
          'h-6 w-6': loadingringsize == 'base',
          'h-7 w-7': loadingringsize == 'lg',
        }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    loadingringsize: {
      type: String,
      default: 'base',
    },
  },
  // data() {
  //   return {
  //     loading: false,
  //     timerCount: 3,
  //   }
  // },
}
</script>

<style scoped></style>
