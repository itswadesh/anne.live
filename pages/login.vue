<template>
  <section
    class="
      flex flex-col
      items-center
      justify-center
      min-h-screen
      p-2
      text-gray-600
      bg-gradient-to-br
      from-secondary-100
      to-primary-100
    "
  >
    <!-- Email login start  -->

    <div
      class="
        px-4
        sm:px-8
        py-10
        border
        rounded-lg
        shadow-lg
        frosted
        w-full
        max-w-sm
      "
    >
      <div class="flex flex-col items-center">
        <!-- Store name  -->

        <nuxt-link
          to="/"
          class="
            mb-5
            text-4xl
            font-extrabold
            text-transparent
            bg-clip-text bg-gradient-to-br
            from-secondary-500
            to-primary-500
            text-center
          "
        >
          <span v-if="store.name">
            {{ store.name }}
          </span>

          <span v-else> {{ settings.websiteName }} </span>
        </nuxt-link>

        <div class="flex flex-col justify-center text-gray-600">
          <h6 class="mb-3 text-center">
            Please login using email and password
          </h6>

          <form @submit.prevent="submit">
            <Textbox
              id="email"
              v-model="email"
              class="mb-3 w-full"
              type="email"
              required
              autofocus
              placeholder="Enter your email"
            />

            <Textbox
              id="password"
              v-model="password"
              type="password"
              class="mb-2 w-full"
              required
              autofocus
              placeholder="Password"
            />

            <div class="mb-5 flex justify-end">
              <nuxt-link
                to="/account/forgot-password"
                class="
                  max-w-max
                  text-xs
                  font-light
                  hover:underline hover:text-gray-800
                  focus:outline-none
                  text-right
                "
              >
                Forgot Password?
              </nuxt-link>
            </div>

            <PrimaryButtonRounded
              class="mb-5 w-full max-w-sm mx-auto"
              type="submit"
              :loading="loading"
            >
              LOGIN
            </PrimaryButtonRounded>
          </form>

          <div
            class="
              w-full
              max-w-sm
              mx-auto
              flex flex-row
              items-center
              justify-between
            "
          >
            <nuxt-link
              to="/otplogin"
              class="
                text-start text-primary-500
                hover:text-primary-700 hover:underline
                max-w-max
              "
            >
              Login with phone
            </nuxt-link>

            <nuxt-link
              to="/account/signup"
              class="
                text-end text-primary-500
                hover:text-primary-700 hover:underline
                max-w-max
              "
            >
              Not a Member yet?
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- OR  -->

      <!-- <div class="mb-8 flex flex-row w-full">
        <span class="w-1/2 border-t border-gray-400"></span>
        <span class="mx-3 my-auto -mt-3">or</span>
        <span class="w-1/2 border-t border-gray-400"></span>
      </div> -->

      <!-- bottom section -->

      <!-- Facebook svg -->

      <!-- <div class="flex flex-row justify-center space-x-2 md:space-x-4">
        <a
          href="/auth/facebook"
          class="
            transition
            duration-300
            border
            rounded-md
            shadow-md
            cursor-pointer
            hover:shadow-lg
          "
        >
          <svg
            class="h-full w-full"
            viewBox="0 0 154 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="154" height="43" rx="5" fill="white" />
            <path
              d="M67.0499 17.732V26H68.1659V22.46H71.1059V21.416H68.1659V18.776H71.8739V17.732H67.0499ZM77.145 26H78.225V20.396H77.145V21.236C76.761 20.6 75.957 20.276 75.177 20.276C73.641 20.276 72.333 21.404 72.333 23.192C72.333 24.968 73.641 26.12 75.177 26.12C75.957 26.12 76.773 25.76 77.145 25.136V26ZM77.133 23.18C77.133 24.368 76.269 25.052 75.273 25.052C74.265 25.052 73.449 24.284 73.449 23.18C73.449 22.076 74.265 21.344 75.273 21.344C76.185 21.344 77.133 21.98 77.133 23.18ZM79.6806 23.18C79.6806 24.956 81.0486 26.12 82.6446 26.12C83.5086 26.12 84.2886 25.784 84.8166 25.208L83.9766 24.512C83.6406 24.86 83.1606 25.064 82.6446 25.064C81.6366 25.064 80.7606 24.296 80.7606 23.18C80.7606 22.052 81.6366 21.344 82.6446 21.344C83.1606 21.344 83.6406 21.536 83.9766 21.872L84.8046 21.176C84.2766 20.6 83.5086 20.276 82.6446 20.276C81.0486 20.276 79.6806 21.404 79.6806 23.18ZM86.7726 22.76C86.9046 21.812 87.6246 21.26 88.5486 21.26C89.4606 21.26 90.1206 21.812 90.2526 22.76H86.7726ZM91.3326 23.18C91.3326 21.404 90.1446 20.276 88.5486 20.276C86.9526 20.276 85.6806 21.404 85.6806 23.18C85.6806 24.956 86.9526 26.12 88.5486 26.12C89.6406 26.12 90.6486 25.628 91.1286 24.632C90.8286 24.5 90.4806 24.404 90.1926 24.272C89.8686 24.836 89.2566 25.136 88.5846 25.136C87.6246 25.136 86.9046 24.56 86.7726 23.612H91.3206C91.3326 23.48 91.3326 23.312 91.3326 23.18ZM93.8126 25.136C94.1846 25.76 94.9886 26.12 95.7686 26.12C97.3046 26.12 98.6126 24.968 98.6126 23.192C98.6126 21.404 97.3286 20.276 95.7806 20.276C94.9646 20.276 94.1846 20.6 93.8126 21.236V17.348H92.7206V26H93.8126V25.136ZM93.8246 23.18C93.8246 21.98 94.7726 21.344 95.6846 21.344C96.6926 21.344 97.4966 22.076 97.4966 23.18C97.4966 24.284 96.6926 25.052 95.6846 25.052C94.6886 25.052 93.8246 24.368 93.8246 23.18ZM102.624 26.12C104.22 26.12 105.564 24.956 105.564 23.18C105.564 21.404 104.22 20.276 102.624 20.276C101.028 20.276 99.6963 21.404 99.6963 23.18C99.6963 24.956 101.028 26.12 102.624 26.12ZM102.624 25.064C101.604 25.064 100.776 24.332 100.776 23.18C100.776 22.052 101.604 21.344 102.624 21.344C103.62 21.344 104.472 22.052 104.472 23.18C104.472 24.332 103.62 25.064 102.624 25.064ZM109.573 26.12C111.169 26.12 112.513 24.956 112.513 23.18C112.513 21.404 111.169 20.276 109.573 20.276C107.977 20.276 106.645 21.404 106.645 23.18C106.645 24.956 107.977 26.12 109.573 26.12ZM109.573 25.064C108.553 25.064 107.725 24.332 107.725 23.18C107.725 22.052 108.553 21.344 109.573 21.344C110.569 21.344 111.421 22.052 111.421 23.18C111.421 24.332 110.569 25.064 109.573 25.064ZM115.047 23.264L117.603 26H119.043L116.067 22.82L118.467 20.396H116.979L115.047 22.352V17.348H113.967V26H115.047V23.264Z"
              fill="#747474"
            />
            <path
              d="M37.9665 25.375V26.075H38.6665H39.8832V30.9911C36.2567 29.8718 33.6165 26.4956 33.6165 22.5C33.6165 17.5966 37.5964 13.6166 42.4998 13.6166C47.4032 13.6166 51.3832 17.5966 51.3832 22.5C51.3832 26.8431 48.269 30.4536 44.1582 31.2285V26.075H46.3332H47.0332V25.375V22.5V21.8H46.3332H44.1582V20.5833C44.1582 20.4428 44.276 20.325 44.4165 20.325H46.3332H47.0332V19.625V16.75V16.05H46.3332H43.9373C41.7012 16.05 39.8832 17.8679 39.8832 20.1041V21.8H38.6665H37.9665V22.5V25.375Z"
              fill="#1877F2"
              stroke="#1877F2"
              stroke-width="1.4"
            />
          </svg>
        </a> -->

      <!-- Google svg -->

      <!-- <a
          href="/auth/google"
          class="
            transition
            duration-300
            border
            rounded-md
            shadow-md
            cursor-pointer
            hover:shadow-lg
          "
        >
          <svg
            class="h-full w-full"
            viewBox="0 0 154 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="154" height="43" rx="5" fill="white" />
            <path
              d="M80.1147 17.728C79.3947 17.056 78.4227 16.636 77.3187 16.636C74.9667 16.636 73.1427 18.544 73.1427 20.884C73.1427 23.236 74.9667 25.12 77.3187 25.12C79.6827 25.12 81.2307 23.764 81.2307 20.848H77.6067V21.82H79.9587C79.8987 23.2 78.7947 24.052 77.3187 24.052C75.5907 24.052 74.2587 22.648 74.2587 20.884C74.2587 19.132 75.5907 17.704 77.3187 17.704C78.0867 17.704 78.7827 18.004 79.3107 18.472L80.1147 17.728ZM85.093 25.12C86.689 25.12 88.033 23.956 88.033 22.18C88.033 20.404 86.689 19.276 85.093 19.276C83.497 19.276 82.165 20.404 82.165 22.18C82.165 23.956 83.497 25.12 85.093 25.12ZM85.093 24.064C84.073 24.064 83.245 23.332 83.245 22.18C83.245 21.052 84.073 20.344 85.093 20.344C86.089 20.344 86.941 21.052 86.941 22.18C86.941 23.332 86.089 24.064 85.093 24.064ZM92.0422 25.12C93.6382 25.12 94.9822 23.956 94.9822 22.18C94.9822 20.404 93.6382 19.276 92.0422 19.276C90.4462 19.276 89.1142 20.404 89.1142 22.18C89.1142 23.956 90.4462 25.12 92.0422 25.12ZM92.0422 24.064C91.0222 24.064 90.1942 23.332 90.1942 22.18C90.1942 21.052 91.0222 20.344 92.0422 20.344C93.0382 20.344 93.8902 21.052 93.8902 22.18C93.8902 23.332 93.0382 24.064 92.0422 24.064ZM97.2754 25.804C97.1314 25.864 96.4954 26.212 96.3634 26.284C96.9034 27.28 97.8514 27.796 98.8954 27.796C100.755 27.796 101.955 26.788 101.955 24.148V19.396H100.875V20.272C100.491 19.636 99.6874 19.276 98.9074 19.276C97.3714 19.276 96.0634 20.44 96.0634 22.216C96.0634 23.992 97.3714 25.12 98.9074 25.12C99.6994 25.12 100.527 24.76 100.875 24.088C100.875 24.136 100.887 24.172 100.887 24.22C100.887 26.08 100.107 26.764 98.8954 26.764C98.2714 26.764 97.6114 26.428 97.2754 25.804ZM100.863 22.204C100.863 23.404 99.9154 24.052 99.0034 24.052C97.9954 24.052 97.1794 23.356 97.1794 22.204C97.1794 21.112 97.9954 20.344 99.0034 20.344C99.9994 20.344 100.863 21.004 100.863 22.204ZM103.771 16.348V25H104.863V16.348H103.771ZM107.409 21.76C107.541 20.812 108.261 20.26 109.185 20.26C110.097 20.26 110.757 20.812 110.889 21.76H107.409ZM111.969 22.18C111.969 20.404 110.781 19.276 109.185 19.276C107.589 19.276 106.317 20.404 106.317 22.18C106.317 23.956 107.589 25.12 109.185 25.12C110.277 25.12 111.285 24.628 111.765 23.632C111.465 23.5 111.117 23.404 110.829 23.272C110.505 23.836 109.893 24.136 109.221 24.136C108.261 24.136 107.541 23.56 107.409 22.612H111.957C111.969 22.48 111.969 22.312 111.969 22.18Z"
              fill="#747474"
            />
            <path
              d="M57.9902 21.6777C57.9902 20.8993 57.9255 20.3313 57.7857 19.7422H48.6895V23.2556H54.0287C53.9211 24.1287 53.3398 25.4436 52.048 26.3272L52.0299 26.4448L54.906 28.6221L55.1052 28.6415C56.9352 26.99 57.9902 24.56 57.9902 21.6777Z"
              fill="#4285F4"
            />
            <path
              d="M48.6891 30.9348C51.3048 30.9348 53.5008 30.0932 55.1048 28.6416L52.0476 26.3273C51.2295 26.8848 50.1315 27.274 48.6891 27.274C46.1271 27.274 43.9526 25.6225 43.1775 23.3398L43.0638 23.3493L40.0733 25.6109L40.0342 25.7172C41.6273 28.8098 44.8998 30.9348 48.6891 30.9348Z"
              fill="#34A853"
            />
            <path
              d="M43.1777 23.3398C42.9731 22.7508 42.8548 22.1196 42.8548 21.4674C42.8548 20.8152 42.9731 20.184 43.1669 19.595L43.1615 19.4695L40.1334 17.1715L40.0344 17.2176C39.3777 18.5009 39.001 19.9421 39.001 21.4674C39.001 22.9927 39.3777 24.4338 40.0344 25.7172L43.1777 23.3398Z"
              fill="#FBBC05"
            />
            <path
              d="M48.689 15.6607C50.5083 15.6607 51.7354 16.4286 52.4352 17.0703L55.1694 14.4615C53.4901 12.9362 51.3048 12 48.689 12C44.8998 12 41.6273 14.1249 40.0342 17.2175L43.1667 19.5949C43.9526 17.3122 46.1271 15.6607 48.689 15.6607Z"
              fill="#EB4335"
            />
          </svg>
        </a>
      </div> -->
    </div>

    <!-- Email login end -->
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
import SignupStep from '~/components/Login/Email/SignupStep.vue'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

import { Textbox } from '~/shared/components/ui'

export default {
  components: {
    NuxtLink,
    SignupStep,
    PrimaryButtonRounded,
    Textbox,
  },

  layout: 'none',

  middleware: ['isGuest', 'isEmailLogin'],

  data() {
    return {
      error: null,
      otp: false,
      signup: false,
      loading: false,
      email: null,
      password: null,
      resetpassword: false,
      otplogin: false,
    }
  },

  head() {
    return {
      title: `Login | ${this.store.name || ''}`,
    }
  },

  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    store() {
      return this.$store.state.store || {}
    },
  },

  methods: {
    ...mapMutations({
      setErr: 'setErr',
      success: 'success',
    }),

    ...mapActions({
      login: 'auth/login',
    }),

    async submit() {
      const msg = 'Login success'
      try {
        this.loading = true
        if (this.email && this.password) {
          await this.login({
            email: this.email,
            password: this.password,
          })
        } else {
          this.setErr('invalid information')
        }
        this.success(msg)
        const r = this.$route.query.ref || '/'
        this.$router.push(r)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.frosted {
  background-image: url('/login/bg-lighter.svg');
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
