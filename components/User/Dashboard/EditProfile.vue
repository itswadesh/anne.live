<template>
  <section class="w-full text-gray-800">
    <form
      v-if="profile"
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit"
    >
      <!-- Profile name and credentials start  -->

      <div class="mb-5 sm:mb-10 text-gray-800 bg-gray-200 rounded-sm">
        <h2
          class="
            p-4
            text-lg
            font-semibold
            tracking-wider
            border-b border-gray-50
          "
        >
          Profile name and credentials
        </h2>

        <div class="py-4">
          <div class="items-center p-4 md:flex">
            <div class="w-full md:px-2 md:w-3/12">First Name</div>
            <div class="w-full md:w-9/12">
              <div class="max-w-sm mt-2 md:mt-0">
                <Textbox
                  v-model="profile.firstName"
                  placeholder="First Name"
                  class="w-full"
                  required
                  autofocus
                  :v="$v.profile.firstName"
                  :err="
                    $v.profile.firstName.$invalid && $v.profile.firstName.$dirty
                      ? 'First Name is required'
                      : ''
                  "
                />
              </div>
            </div>
          </div>

          <div class="items-center p-4 md:flex">
            <div class="w-full md:px-2 md:w-3/12">Last Name</div>
            <div class="w-full md:w-9/12">
              <div class="max-w-sm mt-2 md:mt-0">
                <Textbox
                  v-model="profile.lastName"
                  placeholder="Last Name"
                  class="w-full"
                  required
                />
              </div>
            </div>
          </div>

          <!-- <div class="p-2 md:flex lg:items-center">
          <div class="w-full  md:px-2 md:w-3/12">Community username</div>
          <div class="items-center w-full lg:flex md:w-9/12">
            <div class="max-w-sm mt-2 md:w-96 md:mt-0">
              <Textbox v-model="profile.username" @change="save(profile)" />
            </div>
            <h6 class="my-2 text-xs text-gray-600 lg:ml-5">
              Username for community forums
            </h6>
          </div>
        </div> -->

          <div class="items-center p-4 md:flex">
            <div class="w-full md:px-2 md:w-3/12">Your Email</div>
            <div class="w-full md:w-9/12">
              <div class="max-w-sm mt-2 md:mt-0">
                <Textbox
                  v-model="profile.email"
                  placeholder="Email"
                  class="w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div class="items-center p-4 md:flex">
            <div class="w-full md:px-2 md:w-3/12">Your Phone</div>
            <div class="w-full md:w-9/12">
              <div class="max-w-sm mt-2 md:mt-0">
                <Textbox
                  v-model="profile.phone"
                  placeholder="Email"
                  class="w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div class="items-center p-4 md:flex">
            <div class="w-full md:px-2 md:w-3/12">Gender</div>

            <div class="w-full md:w-9/12">
              <div class="flex mt-2 md:mt-0">
                <label class="flex flex-row cursor-pointer me-4">
                  <Radio
                    id="one"
                    v-model="profile.gender"
                    value="Male"
                    name="group"
                    class="my-auto"
                  />

                  <span class="my-auto text-gray-600 ms-2">Male</span>
                </label>

                <label class="flex flex-row cursor-pointer">
                  <Radio
                    id="one"
                    v-model="profile.gender"
                    value="Female"
                    name="group"
                    class="my-auto"
                  />

                  <span class="my-auto text-gray-600 ms-2">Female</span>
                </label>
              </div>
            </div>
          </div>

          <div class="items-center p-4 md:flex">
            <div class="w-full md:px-2 md:w-3/12">Your Profile Pictur</div>
            <div class="w-full md:w-9/12">
              <div class="max-w-sm mt-2 md:mt-0">
                <!-- <ImageUpload
                  name="avatar"
                  folder="user"
                  :image="profile.avatar"
                  @save="saveImage"
                  @remove="saveImage(profile.avatar, '')"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile name and credentials end  -->

      <PrimaryButtonRounded
        class="w-full p-3 md:px-6 md:p-2 md:w-1/3 sm:w-1/2"
        type="submit"
        :disabled="$v.profile.$anyError && $v.profile.$anyDirty"
        >UPDATE
      </PrimaryButtonRounded>
    </form>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { Textbox, Radio } from '~/shared/components/ui'
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'
import UPDATE_PROFILE from '~/gql/user/updateProfile.gql'
import ME from '~/gql/user/me.gql'

export default {
  components: { Textbox, Radio, PrimaryButtonRounded },

  mixins: [validationMixin],

  data() {
    return {
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
      },
    }
  },
  validations: {
    profile: {
      firstName: { required },
    },
  },
  async created() {
    await this.getMe()
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async getMe() {
      try {
        this.profile = await this.$get('user/me', {})
        // this.profile = (
        //   await this.$apollo.query({
        //     query: ME,
        //     fetchPolicy: 'no-cache',
        //   })
        // ).data.me
      } catch (e) {
        // console.log(e)
      }
    },
    async submit() {
      // console.log("update profile", this.profile)
      const msg = 'Profile Updated'
      delete this.profile.__typename
      delete this.profile.info
      delete this.profile.address
      try {
        const data = await this.$post('user/updateProfile', this.profile)
        // const data = (
        //   await this.$apollo.mutate({
        //     mutation: UPDATE_PROFILE,
        //     variables: this.profile,
        //   })
        // ).data.updateProfile
        this.success(msg)
        const r = this.$route.query.ref || '/my'
        this.$router.push(r)
      } catch (e) {
        this.setErr(e)
      }
    },
  },
}
</script>

<style scoped>
.width {
  min-width: max-content;
}
</style>
