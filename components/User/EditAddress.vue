<template>
  <div class="flex flex-col p-3 sm:p-10 rounded-md shadow-md border">
    <div v-if="address">
      <form novalidate autocomplete="off" @submit.stop.prevent="submit">
        <!-- forms -->
        <div
          class="
            mb-10
            grid grid-cols-1
            gap-2
            text-sm text-gray-800
            md:gap-4 md:grid-cols-2
          "
        >
          <label class="col-span-2 md:col-span-1">
            <h6 class="mb-2 font-semibold">First Name</h6>

            <Textbox
              v-model="address.firstName"
              placeholder=""
              autofocus
              :v="$v.address.firstName"
              :err="
                $v.address.firstName.$invalid && $v.address.firstName.$dirty
                  ? 'First Name is required'
                  : ''
              "
            />
          </label>

          <label class="col-span-2 md:col-span-1">
            <h6 class="mb-2 font-semibold">Last Name</h6>

            <Textbox v-model="address.lastName" placeholder="" required />
          </label>

          <label class="col-span-2 md:col-span-1">
            <h6 class="mb-2 font-semibold">Mobile number</h6>

            <Textbox
              v-model="address.phone"
              type="tel"
              placeholder=""
              :v="$v.address.phone"
              :err="
                $v.address.phone.$invalid && $v.address.phone.$dirty
                  ? 'Phone no is invalid'
                  : ''
              "
            />
          </label>
          <label class="col-span-2 md:col-span-1">
            <!-- @input="$event.target.composing = false" -->
            <h6 class="mb-2 font-semibold">Pincode</h6>

            <Textbox
              v-model.number="address.zip"
              type="tel"
              placeholder=""
              :v="$v.address.zip"
              :err="
                $v.address.zip.$invalid && $v.address.zip.$dirty
                  ? 'Pincode is invalid'
                  : ''
              "
              @keyup="getLocationFromZip(address.zip)"
            />
          </label>

          <label class="col-span-2">
            <h6 class="mb-2 font-semibold">Address (Area and Street)</h6>

            <Textbox
              v-model="address.address"
              placeholder=""
              :v="$v.address.address"
              :err="
                $v.address.address.$invalid && $v.address.address.$dirty
                  ? 'Address is required'
                  : ''
              "
            />
          </label>

          <label class="col-span-2 md:col-span-1">
            <h6 class="mb-2 font-semibold">City/District/Town</h6>

            <Textbox v-model="address.city" placeholder="" />
          </label>

          <label class="col-span-2 md:col-span-1">
            <h6 class="mb-2 font-semibold">State</h6>

            <Textbox v-model="address.state" placeholder="" disabled />
          </label>

          <label class="col-span-2 md:col-span-1">
            <h6 class="mb-2 font-semibold">Country</h6>

            <Textbox v-model="address.country" placeholder="" disabled />
          </label>

          <label class="col-span-2 md:col-span-1">
            <h6 class="mb-2 font-semibold">Email</h6>

            <Textbox
              v-model="address.email"
              placeholder=""
              :v="$v.address.email"
              :err="
                $v.address.email.$invalid && $v.address.email.$dirty
                  ? 'Email is invalid'
                  : ''
              "
            />
          </label>
        </div>

        <div class="w-full">
          <div
            class="flex flex-col items-center justify-center w-full md:flex-row"
          >
            <!-- <div class="w-full my-auto md:w-1/2">
              <label class="flex flex-row">
                <input
                  type="checkbox"
                  class="my-auto border-0 rounded-sm me-3 bg-gray-50 text-primary-500 ring-primary-500 ring-1 focus:ring-1 focus:ring-primary-500 focus:ring-offset-0"
                />
                <h6 class="text-gray-500"
                  >Make this as a default address</
                >
              </label>
            </div> -->

            <!-- :disabled="$v.address.$anyError && $v.address.$anyDirty" -->

            <PrimaryButtonRounded
              type="submit"
              class="w-full md:w-1/2"
              :loading="iconloading"
              :disabled="
                isDisabled ||
                ($v.address.email.$invalid && $v.address.email.$dirty) ||
                ($v.address.$anyError && $v.address.$anyDirty) ||
                ($v.address.zip.$invalid && $v.address.zip.$dirty) ||
                ($v.address.phone.$invalid && $v.address.phone.$dirty) ||
                ($v.address.firstName.$invalid && $v.address.firstName.$dirty)
              "
              @click="loading = true"
            >
              SAVE ADDRESS
            </PrimaryButtonRounded>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { Textbox, Button } from '~/shared/components/ui'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
// import SAVE_ADDRESS from '~/gql/address/saveAddress.gql'
import GET_LOCATION_FROM_ZIP from '~/gql/location/getLocationFromZip.gql'
import ADDRESS from '~/gql/address/address.gql'

export default {
  components: { Textbox, Button, PrimaryButtonRounded },

  mixins: [validationMixin],

  middleware: ['isAuth'],

  props: {
    id: { type: String, default: 'new' },
    returnUrl: { type: String, default: '/checkout/address' },
  },

  validations: {
    address: {
      firstName: { required },
      address: { required },
      zip: { required, min: minLength(5), max: maxLength(6) },
      phone: { min: minLength(9), max: maxLength(14) },
      email: { email },
    },
  },

  data() {
    return {
      iconloading: false,
      address: {
        email: null,
        firstName: null,
        lastName: null,
        address: null,
        town: null,
        city: null,
        country: null,
        state: null,
        zip: null,
        phone: null,
      },
    }
  },

  computed: {
    isDisabled() {
      return (
        !this.address.firstName ||
        !this.address.phone ||
        !this.address.zip ||
        !this.address.address ||
        !this.address.city ||
        !this.address.country
      )
    },

    user() {
      return (this.$store.state.auth || {}).user
    },
  },

  async created() {
    if (this.id !== 'new') await this.getAddress()
  },

  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),

    async getAddress() {
      try {
        this.address = await this.$get('address/address', {
          id: this.$route.query.id,
        })
        // this.address = (
        //   await this.$apollo.query({
        //     query: ADDRESS,
        //     variables: { id: this.$route.query.id },
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.address
        if (!this.address) {
          this.address.firstName = this.user.firstName
          this.address.lastName = this.user.lastName
          this.address.email = this.user.email
          this.address.phone = this.user.phone
          this.address.address = this.user.address
          this.address.town = this.user.town
          this.address.city = this.user.city
          this.address.country = this.user.country
          this.address.zip = this.user.zip
        }
        // console.log(this.address)
      } catch (e) {
        // console.log(e)
      }
    },

    async getLocationFromZip(zip) {
      if (zip.toString().length !== 6) return
      try {
        const locationData = await this.$post('location/getLocationFromZip', {
          zip,
        })
        // const locationData = (
        //   await this.$apollo.mutate({
        //     mutation: GET_LOCATION_FROM_ZIP,
        //     variables: { zip },
        //   })
        // ).data.getLocationFromZip
        // if (!this.address.city)
        this.address.city = locationData.city
        // if (!this.address.state)
        this.address.state = locationData.state
        // if (!this.address.country)
        this.address.country = locationData.country
      } catch (e) {}
    },

    async submit() {
      if (!this.address) return this.setErr('Please enter address')
      // this.address.phone =
      //   this.address.phone && this.address.phone.replace(/^0+/, '')
      if (!this.address.address) return this.setErr('Please enter address')
      const msg = this.id === 'new' ? 'Address Added' : 'Address Updated'
      try {
        this.iconloading = true
        if (this.id !== 'new')
          if (this.address.coords) delete this.address.coords.__typename
        if (!this.address.id) this.address.id = 'new'
        this.address = await this.$post('address/saveAddress', this.address)
        // this.address = (
        //   await this.$apollo.mutate({
        //     mutation: SAVE_ADDRESS,
        //     variables: this.address,
        //   })
        // ).data.saveAddress
        this.success(msg)
        if (this.$route.query.prev)
          this.$router.push(`/${this.$route.query.prev}`)
        else this.$router.push(`${this.returnUrl}`)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.iconloading = false
      }
    },
  },
}
</script>
