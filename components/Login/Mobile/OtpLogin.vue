<template>
  <div
    class="
      z-10
      align-middle
      shadow-lg
      lg:mt-20 lg:overflow-y-auto lg:fixed lg:inset-0
    "
  >
    <div
      class="flex items-center justify-center min-h-screen text-center lg:block"
    >
      <span class="hidden sm:inline-block sm:align-middle" aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="fixed inset-0 hidden transition-opacity lg:flex"
        aria-hidden="true"
      >
        <div class="absolute inset-0 hidden frosted lg:flex"></div>
      </div>

      <div
        class="
          inline-block
          w-full
          overflow-hidden
          transition-all
          transform
          text-start
          lg:my-8 lg:align-middle
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="flex lg:justify-center">
          <div
            class="
              flex flex-row
              w-full
              h-full
              bg-white
              shadow-md
              lg:rounded-lg lg:w-3/5
            "
          >
            <div class="hidden w-1/2 h-full p-6 sm:flex">
              <img
                v-lazy="'/img/loginImg.png'"
                alt="pic"
                class="object-contain w-full h-full"
              />
            </div>
            <div
              class="w-full sm:w-1/2 lg:rounded-r-lg lg:rounded-br-lg bgwhite"
            >
              <div class="relative h-full">
                <!-- <div class="justify-end hidden w-full lg:flex">
                  <button
                    type="button"
                    @click="hide(null)"
                    class="flex justify-end m-1 focus:outline-none"
                  >
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 33 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 0.515625C7.66992 0.515625 0.515625 7.66992 0.515625 16.5C0.515625 25.3301 7.66992 32.4844 16.5 32.4844C25.3301 32.4844 32.4844 25.3301 32.4844 16.5C32.4844 7.66992 25.3301 0.515625 16.5 0.515625ZM24.3375 20.6959C24.6404 20.9988 24.6404 21.4887 24.3375 21.7916L21.7852 24.3375C21.4822 24.6404 20.9924 24.6404 20.6895 24.3375L16.5 20.1094L12.3041 24.3375C12.0012 24.6404 11.5113 24.6404 11.2084 24.3375L8.6625 21.7852C8.35957 21.4822 8.35957 20.9924 8.6625 20.6895L12.8906 16.5L8.6625 12.3041C8.35957 12.0012 8.35957 11.5113 8.6625 11.2084L11.2148 8.65605C11.5178 8.35313 12.0076 8.35313 12.3105 8.65605L16.5 12.8906L20.6959 8.6625C20.9988 8.35957 21.4887 8.35957 21.7916 8.6625L24.3439 11.2148C24.6469 11.5178 24.6469 12.0076 24.3439 12.3105L20.1094 16.5L24.3375 20.6959Z"
                        fill="#BABABA"
                      />
                    </svg>
                  </button>
                </div> -->
                <div>
                  <nuxt-link
                    to="/"
                    class="
                      flex flex-col
                      items-center
                      justify-center
                      py-16
                      font-semibold
                      tracking-wider
                      text-center
                      lg:py-8
                    "
                  >
                    <img
                      v-lazy="store.logo"
                      class="object-contain w-48 h-20 my-auto lg:h-12 lg:w-44"
                    />
                  </nuxt-link>
                  <div v-if="!isRequestSent">
                    <EnterMobileNumber :phone="phone" @sendOtp="onSendOtp" />
                  </div>
                  <!--enter otp -->
                  <div v-else>
                    <EnterOtp
                      :country-code="countryCode"
                      :phone="phone"
                      @reRequest="isRequestSent = false"
                      @success="$emit('showLogin', false)"
                    />
                  </div>
                </div>
                <!-- bottom text -->
                <div class="bottom-0 w-full">
                  <p
                    class="
                      flex flex-wrap
                      justify-center
                      w-11/12
                      mx-auto
                      my-3
                      text-center
                      lg:my-2
                      dddd
                    "
                  >
                    <b class="px-1 text-gray-500">
                      "I agree to the terms and conditions"
                    </b>
                  </p>
                </div>
                <button
                  v-if="closeButton"
                  class="
                    absolute
                    top-0
                    right-0
                    mt-2
                    rounded-full
                    me-2
                    hover:bg-gray-200
                  "
                  @click="$emit('showLogin', false)"
                >
                  <svg
                    class="w-6 h-6 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnterOtp from './EnterOtp'
import EnterMobileNumber from './EnterMobileNumber'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { EnterMobileNumber, EnterOtp, NuxtLink },
  props: {
    closeButton: { type: Boolean, default: true },
  },
  data() {
    return {
      isRequestSent: false,
      phone: null,
      countryCode: null,
    }
  },
  computed: {
    store() {
      return this.$store.state.store || {}
    },
  },
  methods: {
    // hide(e) {
    //   if (e) this.$router.push(`/c/${e}`)
    //   this.$emit('hide', true)
    // },
    onSendOtp(val) {
      this.phone = val.phone
      this.countryCode = val.countryCode
      this.isRequestSent = true
    },
  },
}
</script>
<style scoped>
.frosted {
  /* background-color:rgb(150, 139, 224); */
  backdrop-filter: blur(15px);
  background-color: hsla(31, 36%, 81%, 0.75);
}
.dddd {
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 10px;
  text-align: center;
  color: rgba(167, 164, 164, 0.5);
}

.bgwhite {
  background: #f6f6f6;
}
.backgroundcolor {
  background: linear-gradient(to right bottom, #cc8c30 70%, white 30%);
}
</style>
