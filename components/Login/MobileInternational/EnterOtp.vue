<template>
  <div>
    <div class="flex flex-col space-y-1">
      <div class="text-center">
        <span class="text-2xl font-bold text-secondary-500"
          >OTP Verification</span
        >
        <h1 class="mt-2 text-xs font-medium text-gray-800">
          We have sent your SMS with a
          <span class="text-xs font-bold text-gray-800">OTP</span>
          <span class="text-xs text-gray-800">
            code to your number for verification
          </span>
        </h1>
        <p class="text-xs font-normal text-gray-900">
          on this Device Mobile Number
        </p>
      </div>
      <label for="email" class="text-xs text-center text-gray-800">
        Enter The OTP sent to
        <span class="text-xs font-bold"> {{ country_code }}-{{ phone }} </span>
        <button class="text-xs" @click="$emit('reRequest')">Change</button>
      </label>
      <!-- otp Enter -->
      <!-- <OtpDesign @verifyOtp="VerifyOtp" /> -->
    </div>

    <!-- <div
      class="flex flex-row items-center justify-center text-xs text-orange-500"
    >
    Please wait for 00:{{ timerCount }} seconds
    </div> -->

    <div class="text-center">
      <h1 class="text-xs text-gray-700">
        Didn't recive the OTP?
        <div v-if="timerCount != 0">
          Please wait for 00:{{ timerCount }} seconds before next request
        </div>
        <button
          v-else
          button
          class="text-sm font-semibold text-orange-500 uppercase"
          @click="requestOtp"
        >
          Resend otp
        </button>
      </h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
// import OtpDesign from './OtpDesign'
import getOtp from '~/gql/user/getOtp.gql'
export default {
  // components: { OtpDesign },
  props: {
    countryCode: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      timerCount: 3,
    }
  },
  computed: {
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
        const result = await this.$post('user/getOtp', {
          phone: this.country_code + this.phone,
        })
        // const result = (
        //   await this.$apollo.mutate({
        //     mutation: getOtp,
        //     variables: { phone: this.country_code + this.phone },
        //   })
        // ).data
        this.timerCount = result.timer
        // this.timerCount = result.getOtp.timer
        this.success('OTP Send Successfully')
      } catch (e) {
        this.setErr(e)
      }
    },
    async VerifyOtp(val) {
      try {
        await this.verifyOtp({
          otp: val,
          phone: this.country_code + this.phone,
        })
        const r = this.$route.query.ref || '/'
        this.$router.push(r)
        this.success('OTP Verified Successfully')
      } catch (e) {
        // this.setErr(e.toString())
      }
    },
  },
}
</script>
