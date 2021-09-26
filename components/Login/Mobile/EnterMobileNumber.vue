<template>
  <div class="h-auto text-gray-800">
    <div v-if="!email" class="relative h-full">
      <form
        v-if="!email"
        novalidate
        autocomplete="off"
        class="flex flex-col"
        @submit.stop.prevent="requestOtp"
      >
        <div class="mb-5 flex flex-col space-y-3">
          <span class="text-center">Please enter Mobile Number</span>

          <Textbox
            id="number"
            ref="mobile"
            v-model="phone"
            type="tel"
            maxlength="13"
            autofocus
            placeholder="Enter Phone Number"
            required
            class="w-full max-w-sm mx-auto"
          />
        </div>

        <PrimaryButtonRounded
          class="w-full max-w-sm mx-auto"
          type="submit"
          :loading="loading"
        >
          SEND OTP
        </PrimaryButtonRounded>
      </form>
    </div>

    <div v-else>
      <EnterEmail />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import EnterEmail from '~/components/Login/Email/EnterEmail.vue'
import GET_OTP from '~/gql/user/getOtp.gql'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import { Textbox } from '~/shared/components/ui'

export default {
  components: {
    EnterEmail,
    PrimaryButtonRounded,
    Textbox,
  },

  data() {
    return {
      email: false,
      transition: 'page',
      loading: false,
      phone: null,
      countryCode: '+91',
      title: 'aboutpage',
    }
  },

  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },

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
        this.$emit('sendOtp', {
          phone: this.phone,
          countryCode: this.countryCode,
        })
      } catch (e) {
        this.setErr(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
