<template>
  <transition v-if="showLoader" name="fade">
    <div
      class="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          px-4
          pt-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="
            inline-block
            p-8
            overflow-hidden
            text-xl text-center
            align-bottom
            transition-all
            transform
            bg-white
            rounded-lg
            shadow-xl
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="flex items-center justify-center">
            <svg
              class="w-6 h-6 text-gray-500 -ms-1 animate-spin"
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
            <span v-if="text" class="mx-2">{{ text }}</span>
            <span v-else class="mx-2">Loading</span>
            <div class="loading">
              <span
                class="
                  inline-block
                  w-2
                  h-2
                  text-2xl
                  font-bold
                  bg-gray-500
                  rounded-full
                  animate-bounce
                "
              ></span>
              <span
                class="
                  inline-block
                  w-2
                  h-2
                  text-2xl
                  font-bold
                  bg-gray-500
                  rounded-full
                  animate-bounce
                "
              ></span>
              <span
                class="
                  inline-block
                  w-2
                  h-2
                  text-2xl
                  font-bold
                  bg-gray-500
                  rounded-full
                  animate-bounce
                "
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    text: { type: String, default: null },
  },
  data() {
    return {
      showLoader: false,
    }
  },
  watch: {
    // whenever show changes, this function will run
    show(newShow, oldShow) {
      setTimeout(
        (_) => (this.showLoader = newShow), // enable the input
        1000 // after 1 second
      )
    },
  },
}
</script>

<style scoped>
.frosted {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.loading span:nth-child(2) {
  animation-delay: 0.4s;
}
.loading span:nth-child(3) {
  animation-delay: 0.8s;
}
</style>
