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
    <!-- OTP login start  -->

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
      <div class="flex flex-col">
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

        <!-- enter mobile number -->

        <div v-if="!isRequestSent" class="mb-10">
          <EnterMobileNumber :phone="phone" @sendOtp="onSendOtp" />
        </div>

        <!-- enter otp -->

        <div v-else class="mb-10">
          <EnterOtp
            :country-code="countryCode"
            :phone="phone"
            @reRequest="isRequestSent = false"
          />
        </div>

        <div class="flex items-center justify-center">
          <nuxt-link
            to="/login?forced=true"
            class="
              text-start text-primary-500
              hover:text-primary-700 hover:underline
              max-w-max
            "
          >
            Login with email
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- OTP login end -->
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Checkbox from '~/shared/components/ui/Checkbox.vue'
import SignupStep from '~/components/Login/Email/SignupStep.vue'
import EnterOtp from '~/components/Login/Mobile/EnterOtp.vue'
import EnterMobileNumber from '~/components/Login/Mobile/EnterMobileNumber.vue'
import GET_OTP from '~/gql/user/getOtp.gql'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: {
    Checkbox,
    SignupStep,
    EnterOtp,
    EnterMobileNumber,
    NuxtLink,
  },
  layout: 'none',
  middleware: 'isGuest',
  data() {
    return {
      email: false,
      transition: 'page',
      loading: false,
      phone: null,
      countryCode: '+91',
      title: 'aboutpage',
      isRequestSent: false,
    }
  },
  head() {
    return {
      title: `Otp Login | ${this.store.name || ''}`,
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
  // mounted() {
  //   this.$refs.mobile.focus();
  // },
  methods: {
    ...mapMutations({ setErr: 'setErr' }),
    async requestOtp() {
      this.loading = true
      try {
        await this.$post('user/getOtp', {
          phone: this.countryCode + this.phone,
        })
        // await this.$apollo.mutate({
        //   mutation: GET_OTP,
        //   variables: { phone: this.countryCode + this.phone },
        // })
        // this.$emit('sendOtp', {
        //   phone: this.phone,
        //   countryCode: this.countryCode,
        // })
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },
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
  background-image: url('/login/bg-lighter.svg');
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
