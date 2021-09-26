<template>
  <!-- component -->
  <div
    class="flex items-center justify-center min-h-screen p-4 backgroundcolor"
  >
    <div
      class="flex flex-col items-center rounded-md overflow-hidde max md:flex-1"
    >
      <div
        class="flex flex-col mt-10 bg-white border rounded shadow-lg lg:w-1/3"
      >
        <div
          class="
            relative
            p-4
            pt-16
            text-primary-500
            md:flex-shrink-0 md:flex md:flex-col md:items-center
          "
        >
          <!-- <img
            v-lazy="store.logo"
            :alt="store.name"
            class="absolute z-10 hidden object-contain w-32 h-32 md:flex -top-20"
                /> -->
          <img
            src="/img/69-512.png"
            alt="login"
            class="
              absolute
              z-10
              hidden
              object-contain
              w-32
              h-32
              md:flex
              -top-20
            "
          />
        </div>
        <div class="p-5 px-12 md:flex-1">
          <div v-if="!isRequestSent">
            <EnterMobileNumber :phone="phone" @sendOtp="onSendOtp" />
          </div>
          <!--enter otp -->
          <div v-else>
            <EnterOtp
              :country-code="countryCode"
              :phone="phone"
              @reRequest="isRequestSent = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnterOtp from './EnterOtp'
import EnterMobileNumber from './EnterMobileNumber'

export default {
  components: { EnterMobileNumber, EnterOtp },
  data() {
    return {
      isRequestSent: false,
      phone: null,
      countryCode: null,
    }
  },
  methods: {
    onSendOtp(val) {
      this.phone = val.phone
      this.countryCode = val.countryCode
      this.isRequestSent = true
    },
  },
}
</script>
<style scoped>
.backgroundcolor {
  background: linear-gradient(to right bottom, #cc8c30 70%, white 30%);
}
</style>
