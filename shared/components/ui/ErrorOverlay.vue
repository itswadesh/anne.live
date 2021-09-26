<template>
  <transition name="fade">
    <div v-if="err" class="fixed inset-0 z-10 overflow-y-auto">
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
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div
          class="
            inline-block
            overflow-hidden
            align-bottom
            transition-all
            transform
            bg-white
            rounded-lg
            shadow-xl
            text-start
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                  w-12
                  h-12
                  mx-auto
                  bg-brand-100
                  rounded-full
                  sm:mx-0 sm:h-10 sm:w-10
                "
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg
                  class="`h-6 w-6 text-brand-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-left">
                <div class="mt-2">
                  <p class="text-brand-700">
                    {{ err }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="
                inline-flex
                justify-center
                w-full
                px-4
                py-2
                text-base
                font-medium
                text-white
                bg-brand-700
                border border-transparent
                rounded-md
                shadow-sm
                hover:bg-brand-800
                focus:ring-brand-800
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                sm:ms-3 sm:w-auto sm:text-sm
              "
              @click="submit"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: { show: { type: Boolean }, err: { type: String, default: null } },
  methods: {
    submit() {
      this.err = null
      this.$emit('submit')
    },
  },
}
</script>

<style></style>
