<template>
  <div class="container mx-auto">
    <!--  -->
    <div v-if="!signup && !otp">
      <span
        class="
          flex
          justify-center
          px-6
          text-base
          font-thin
          text-center text-gray-400
        "
        >To keep connected with us please login with your pesonal info</span
      >
      <form novalidate autocomplete="off" @submit.stop.prevent="submit">
        <div class="flex flex-col w-full mt-2 space-y-3 conatiner">
          <Textbox
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-4/5 mx-auto"
            required
            autofocus
          />

          <Textbox
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-4/5 mx-auto"
            required
          />
        </div>
        <div class="w-full px-10">
          <div class="flex justify-end">
            <button
              class="
                flex
                justify-end
                my-2
                text-xs
                font-light
                text-gray-400
                underline
                focus:outline-none
                text-end
              "
            >
              Forgot Password?
            </button>
          </div>
          <button
            class="
              flex
              justify-center
              w-full
              px-4
              py-2
              text-lg
              font-semibold
              transition-colors
              border-2
              rounded-md
              shadow
              border-primary-500
              focus:outline-none focus:ring-primary-500 focus:ring-2
            "
            :class="
              loading ? 'text-white bg-gray-500' : 'bg-primary-500 text-white'
            "
            type="submit"
            :disabled="loading"
          >
            <span
              v-if="!loading"
              class="text-base font-light uppercase text-normal"
            >
              Login
            </span>
            <span v-else>
              <svg
                class="w-6 h-6 text-white -ms-1 animate-spin"
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
            </span>
          </button>
          <button
            class="
              flex
              justify-center
              w-full
              px-4
              py-2
              mt-3
              text-lg
              font-semibold
              transition-colors
              duration-300
              bg-white
              border-none
              rounded-md
              shadow
              focus:outline-none focus:ring-primary-500 focus:ring-2
              ring-1 ring-primary-500
              text-primary-500
            "
            @click="otp = !otp"
          >
            <span class="text-base font-light uppercase"> login with otp </span>
          </button>
        </div>
      </form>
      <div class="px-12 my-1" @click="signup = !signup">
        <span
          class="
            flex
            justify-center
            p-1
            my-1
            mt-5
            text-sm
            font-medium
            cursor-pointer
            lg:mt-3
            text-primary-200
            hover:text-primary-500 hover:underline
          "
        >
          Not a Member yet?
        </span>
      </div>
    </div>
    <div v-else-if="otp">
      <EnterMobileNumber />
    </div>
    <div v-else>
      <SignUp />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { Textbox } from '~/shared/components/ui'
import SignUp from '~/components/Login/Email/SignUp.vue'
import EnterMobileNumber from '~/components/Login/Mobile/EnterMobileNumber.vue'
export default {
  components: {
    EnterMobileNumber,
    SignUp,
    Textbox,
  },
  data() {
    return {
      error: null,
      otp: false,
      signup: false,
      loading: false,
      email: '',
      password: '',
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
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
        if (this.email && this.password) {
          const data = await this.login({
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
        this.setErr(e.toString())
        // console.log(e)
      }
    },
  },
}
</script>
