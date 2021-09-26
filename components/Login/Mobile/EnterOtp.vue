<template>
  <div class="h-auto text-gray-800">
    <form @submit.prevent="VerifyTheOtp()">
      <div class="flex flex-col">
        <div class="mb-3 text-center text-xl font-medium text-primary-500">
          OTP Verification
        </div>

        <label
          for="email"
          class="
            mb-5
            flex flex-col
            items-center
            justify-center
            space-y-1
            text-center
          "
        >
          <div class="text-sm">Enter the OTP sent to</div>

          <div class="flex text-xs space-x-2">
            <b> {{ countryCode }}-{{ phone }} </b>

            <button
              type="button"
              class="
                text-primary-500
                hover:text-primary-700 hover:underline
                focus:outline-none
              "
              @click="$emit('reRequest')"
            >
              Change
            </button>
          </div>
        </label>

        <div class="mb-5 flex justify-center">
          <otp-input
            ref="otpInput"
            input-classes="mw-2 w-12 mx-2 border-none rounded shadow-md appearance-none none ring-1 ring-gray-100 focus:ring-1 focus:ring-primary-500 text-center rounded border-0 shadow-lg"
            :num-inputs="4"
            separator=" "
            :should-auto-focus="true"
            @on-complete="VerifyTheOtp"
          />
        </div>

        <div class="mb-5 text-center">
          <h1 class="text-xs text-gray-700 space-x-2">
            <span>Didn't receive the OTP?</span>

            <span v-if="timerCount != 0">
              Please wait for 00:{{ timerCount }} seconds before next request
            </span>

            <button
              v-else
              type="button"
              class="
                text-sm
                font-semibold
                uppercase
                text-primary-500
                hover:text-primary-700 hover:underline
                focus:outline-none
              "
              @click="requestOtp"
            >
              Resend otp
            </button>
          </h1>
        </div>

        <PrimaryButtonRounded
          class="w-full max-w-sm mx-auto"
          type="submit"
          :disabled="loading"
          :loading="loading"
        >
          VERIFY
        </PrimaryButtonRounded>
      </div>
    </form>
  </div>
</template>

<script>
import OtpInput from '@bachdgvn/vue-otp-input'
import { mapActions, mapMutations } from 'vuex'
import GET_OTP from '~/gql/user/getOtp.gql'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: { OtpInput, PrimaryButtonRounded },

  props: {
    countryCode: {
      type: String,
      default: '+91',
    },
    phone: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      loading: false,
      timerCount: 3,
      otp: null,
    }
  },

  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return this.$store.state.auth.user
    },
  },

  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
          }, 1000)
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },

  mounted() {
    $nuxt.$on('getPhoneNo', (val) => {
      this.phone = val
    })
  },

  methods: {
    ...mapActions({ verifyOtp: 'auth/verifyOtp' }),
    ...mapMutations({ setErr: 'setErr', success: 'success' }),
    async requestOtp() {
      try {
        this.loading = true
        const result = await this.$post('user/getOtp', {
          phone: this.countryCode + this.phone,
        })
        // const result = (
        //   await this.$apollo.mutate({
        //     mutation: GET_OTP,
        //     variables: { phone: this.countryCode + this.phone },
        //   })
        // ).data
        this.timerCount = result.getOtp.timer
        this.timerCount = result.timer
        this.success('OTP Send Successfully')
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },

    async VerifyTheOtp(val) {
      if (val) this.otp = val
      try {
        this.loading = true
        const user = await this.verifyOtp({
          otp: this.otp,
          phone: this.countryCode + this.phone,
        })
        this.$emit('success')
        let r = this.$route.query.ref || '/'
        if (!user.firstName) {
          r = `/my/profile?ref=${r}`
        }
        this.$router.push(r)
        this.success('OTP Verified Successfully')
        this.$gtag.event('login', { method: 'Google' })
      } catch (e) {
        // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', e)
        // this.setErr(e.toString())
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.error {
  border: 1px solid red !important;
}
</style>
