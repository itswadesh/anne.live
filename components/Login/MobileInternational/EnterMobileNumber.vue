<template>
  <div>
    <div
      to="/"
      class="
        flex flex-col
        items-center
        justify-center
        py-4
        font-semibold
        tracking-wider
        text-center
      "
    >
      <img
        v-lazy="store.logoMobile"
        alt=""
        class="object-contain w-32 h-20 -mt-10"
      />
      <div class="my-6 text-2xl text-secondary-500">OTP Verification</div>
      <p class="text-sm font-normal text-gray-500">
        We will Send you <b> One Time Password </b>on this Mobile Number
      </p>
    </div>
    <form class="flex flex-col" @submit.prevent="requestOtp">
      <div class="flex flex-col space-y-1">
        <p class="my-3 text-gray-600">
          <!-- <img src="/img/flag.png" alt="flag" class="w-8 h-5 me-3" /> -->
          <select
            v-model="countryCode"
            class="
              w-full
              px-8
              py-2
              transition
              duration-300
              border border-gray-300
              rounded
              focus:outline-none
              focus:border-transparent
              focus:ring-1
              focus:ring-blue-200
            "
          >
            <option
              v-for="(c, ix) in countries"
              :key="ix"
              :value="c.dialCode"
              class="flex flex-row px-2 mx-auto my-auto"
            >
              {{ c.name }}({{ c.dialCode }})
            </option>
          </select>
        </p>
        <input
          id="number"
          v-model="phone"
          type="text"
          maxlength="13"
          autofocus
          placeholder="Enter Phone Number"
          required
          class="
            px-4
            py-2
            transition
            duration-300
            border
            rounded
            hover:border-primary-500
            focus:outline-none focus:ring-primary-500 focus:border-transparent
          "
        />
      </div>
      <div
        class="
          relative
          mt-4
          text-center text-white
          rounded
          shadow-md
          cursor-pointer
        "
      >
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
            duration-300
            rounded-md
            shadow
            focus:outline-none focus:ring-secondary-500 focus:ring-4
          "
          :class="
            loading ? 'text-gray-600 bg-gray-200' : 'bg-primary-500 text-white'
          "
          type="submit"
          :disabled="loading"
        >
          <p v-if="!loading" class="py-1 text-sm uppercase">Continue</p>
          <p v-else>
            <svg
              class="w-6 h-6 -ms-1 text-white animate-spin"
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
          </p>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import getOtp from '~/gql/user/getOtp.gql'
import COUNTRIES from '~/gql/country/countries'
export default {
  name: 'EnterMobileNumber',
  data() {
    return {
      transition: 'page',
      loading: false,
      phone: null,
      countryCode: '+91',
      countries: null,
      title: 'aboutpage',
    }
  },
  computed: {
    store() {
      return this.$store.state.store || {}
    },
  },
  created() {
    this.getCountries()
  },
  methods: {
    ...mapMutations({ setErr: 'setErr' }),
    async getCountries() {
      try {
        this.countries = await this.$get('country/countries', {})
        // this.countries = (
        //   await this.$apollo.query({ query: COUNTRIES })
        // ).data.countries
      } catch (e) {}
    },
    async requestOtp() {
      this.loading = true
      try {
        const result = await this.$post('user/getOtp', {
          phone: this.countryCode + this.phone,
        })
        // const result = (
        //   await this.$apollo.mutate({
        //     mutation: getOtp,
        //     variables: { phone: this.countryCode + this.phone },
        //   })
        // ).data
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
