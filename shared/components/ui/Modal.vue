<template>
  <transition name="fade z-50">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div v-if="show" class="fixed inset-0 z-10 overflow-y-auto frosted">
      <div class="flex items-center justify-center min-h-screen py-3">
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->

        <!-- This element is to trick the browser into centering the modal contents. -->

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
            text-left
            align-bottom
            transition-all
            transform
            bg-white
            rounded-lg
            shadow-xl
            m-3
            sm:my-auto sm:align-middle
            max-w-3xl
            w-full
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="p-3 sm:p-6">
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
                  rounded-full
                  sm:mx-0 sm:h-10 sm:w-10
                "
                :class="{
                  'bg-brand-100': type == 'error',
                  'bg-secondary-100': type == 'success',
                  'bg-blue-100': type == 'info',
                  'bg-yellow-100': type == 'warning',
                }"
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg
                  class="`h-6 w-6"
                  :class="{
                    'text-brand-700': type == 'error',
                    'text-secondary-500': type == 'success',
                    'text-blue-600': type == 'info',
                    'text-brand-500': type == 'warning',
                  }"
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
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  id="modal-headline"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <slot />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="okText || cancelText" class="px-4 pb-6 sm:px-6 sm:flex">
            <div class="ml-auto flex space-x-5 items-center">
              <PrimaryButtonRounded
                type="button"
                class="text-sm px-8"
                @click="submit"
              >
                {{ okText }}
              </PrimaryButtonRounded>
              <button
                type="button"
                class="
                  inline-flex
                  justify-center
                  w-full
                  px-4
                  py-2
                  mt-3
                  text-base
                  font-semibold
                  text-primary-500
                  transition
                  duration-300
                  transform
                  bg-transparent
                  border border-transparent
                  rounded-md
                  hover:border-gray-300
                  hover:shadow-sm
                  hover:text-white
                  hover:bg-gray-500
                  focus:outline-none
                  active:scale-90
                  focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                "
                @click="cancel"
              >
                {{ cancelText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
export default {
  components: { PrimaryButtonRounded },
  props: {
    title: { type: String, default: null },
    show: { type: Boolean, default: false },
    okText: { type: String, default: null },
    cancelText: { type: String, default: null },
    type: { type: String, default: null },
  },
  methods: {
    submit() {
      this.$emit('submit')
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
