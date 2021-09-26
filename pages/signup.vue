<template>
  <!-- component -->
  <div
    class="
      flex
      items-center
      justify-center
      w-full
      min-h-screen
      p-5
      pt-16
      bg-opacity-50
      backgroundcolor
      md:px-40
      lg:px-0 lg:h-full lg:p-0
    "
  >
    <div
      class="
        flex flex-col
        w-full
        overflow-hidden
        bg-white
        rounded-md
        shadow-lg
        lg:shadow-none
        max
        md:flex-row
        lg:h-screen
        md:flex-1
      "
    >
      <div
        class="
          hidden
          p-4
          py-6
          text-white
          bg-primary-500
          opacity-70
          lg:w-1/2
          lg:flex-shrink-0
          lg:flex
          lg:flex-col
          lg:items-center
          lg:justify-evenly
        "
      >
        <!--  -->
        <!-- <div>
            <b>{{ 'SIGN UP' }}</b>
            {{ 'TO ' + store.name }}
          </div> -->
        <!--  -->
        <div class="my-3 text-4xl font-semibold tracking-wider text-center">
          <b>{{ 'SIGN UP' }}</b>
          {{ 'TO ' + store.name }}
        </div>
        <span class="mt-6 font-normal text-center text-white md:mt-0">
          Explore cart, wishlist, products, and more..
        </span>
        <span
          class="
            flex flex-col
            items-center
            justify-center
            w-full
            mt-5
            text-center
          "
        >
          <span>Already have an account?</span>
          <nuxt-link :to="localePath('/login')" class="mt-4">
            <button
              class="
                p-4
                px-20
                text-white
                ease-in-out
                border border-white
                focus:outline-none
                rounded-3xl
                focus:ring-opacity-50
                focus:ring
                focus:ring-offset-2
                focus:ring-yellow-600
                duration-200
                hover:-translate-y-0.5
                transition
                transform
              "
            >
              Login
            </button>
          </nuxt-link>
        </span>
        <div class="mt-6 text-sm text-center text-gray-300">
          Read our
          <a href="#" class="underline">terms</a> and
          <a href="#" class="underline">conditions</a>
        </div>
      </div>
      <div class="p-2 px-6 pt-4 bg-white md:mt-0 lg:p-5 lg:px-20 md:flex-1">
        <h3 class="flex justify-center lg:py-3">
          <img v-lazy="store.logoMobile" alt="" class="w-32 h-20" />
        </h3>
        <span class="my-6 font-medium text-center text-primary-500 lg:my-3">
          SignUp using social account
        </span>
        <div class="flex flex-row items-center justify-center pb-2">
          <nuxt-link to="/">
            <img
              v-lazy="'/img/social-facebook.png'"
              alt="fb"
              class="
                object-contain
                w-8
                h-8
                border
                rounded-full
                shadow-lg
                hover:opacity-75
              "
            />
          </nuxt-link>
          <nuxt-link to="/">
            <img
              v-lazy="'/img/social-linkedin-circle.png'"
              alt="in"
              class="
                object-contain
                w-8
                h-8
                mx-4
                border
                rounded-full
                shadow-lg
                hover:opacity-75
              "
            />
          </nuxt-link>
          <nuxt-link to="/">
            <img
              v-lazy="'/img/googl.jpg'"
              alt="google"
              class="
                object-contain
                w-8
                h-8
                border
                rounded-full
                shadow-lg
                hover:opacity-75
              "
            />
          </nuxt-link>
        </div>
        <span class="py-3 text-sm text-center text-gray-500">
          Or you can use your account
        </span>
        <form
          novalidate
          autocomplete="off"
          class="flex flex-col px-0 space-y-3 md:px-10 lg:px-7"
          @submit.stop.prevent="submit"
        >
          <div class="flex flex-col space-y-2 lg:space-y-5">
            <!-- first name -->
            <input
              v-model="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              autofocus
              required
              class="
                px-4
                py-2
                transition
                duration-300
                border-none
                rounded-3xl
                focus:ring-1 focus:ring-yellow-600
                ring-1 ring-gray-400
                focus:border-transparent focus:outline-none
              "
            />
            <!-- last name -->
            <input
              v-model="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
              class="
                px-4
                py-2
                transition
                duration-300
                border-none
                rounded-3xl
                focus:ring-1 focus:ring-yellow-600
                ring-1 ring-gray-400
                focus:border-transparent focus:outline-none
              "
            />
            <!-- email  -->
            <input
              v-model="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              class="
                px-4
                py-2
                transition
                duration-300
                border-none
                rounded-3xl
                focus:ring-1 focus:ring-yellow-600
                ring-1 ring-gray-400
                focus:border-transparent focus:outline-none
              "
            />
            <input
              v-model="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              class="
                px-4
                py-2
                transition
                duration-300
                border-gray-300 border-none
                rounded-3xl
                ring-1
                focus:ring-yellow-600
                focus:border-transparent
                focus:outline-none
                focus:ring-1
                ring-gray-400
              "
            />
            <input
              v-model="passwordConfirmation"
              name="password1"
              type="password"
              required
              placeholder="Confirm Password"
              class="
                px-4
                py-2
                transition
                duration-300
                border-gray-300 border-none
                rounded-3xl
                ring-1
                focus:ring-yellow-600
                focus:border-transparent
                focus:outline-none
                focus:ring-1
                ring-gray-400
              "
            />
          </div>
          <div class="msg">{{ msg }}</div>
          <div class="flex justify-center w-full mx-auto">
            <button
              :disabled="loading"
              type="submit"
              class="
                w-4/5
                px-4
                py-2
                text-lg
                font-semibold
                bg-primary-500
                text-white
                duration-200
                rounded-3xl
                shadow
                focus:outline-none
                hover:-translate-y-0.5
                transition
                transform
                ease-in-out
                focus:ring-opacity-50
                hover:opacity-8
                focus:ring focus:ring-offset-2 focus:ring-yellow-600
              "
            >
              <span>Sign Up</span>
            </button>
          </div>
          <div class="lg:hidden">
            <nuxt-link to="/login">
              {{ 'Already have account?' }}
              <b class="text-primary-500">{{ 'Sign in' }}</b>
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  layout: 'none',
  middleware: ['isGuest'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: 'litekart',
      passwordConfirmation: '',
      role: 'vendor',
      loading: false,
      fadeIn: '',
      disable: 'disable',
      showOTP: false,
      msg: null,
    }
  },
  head() {
    return {
      title: `SignUp | ${this.store.name || ''}`,
    }
  },
  computed: {
    ...mapGetters({ store: 'store', error: 'error' }),
  },
  methods: {
    ...mapActions({ register: 'auth/register' }),
    ...mapMutations({
      setErr: 'setErr',
      success: 'success',
    }),
    go(url) {
      this.$router.push(`${url}`)
    },
    async submit() {
      try {
        const data = await this.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
          role: this.role,
        })
        if (data) {
          this.success('Signup Successful')
          const referrer = this.$route.query.referrer || '/'
          if (referrer) this.$router.push(referrer)
        }
      } catch (e) {
        this.setErr(e)
      } finally {
        // this.busy()
      }
    },
  },
}
</script>

<style scoped>
.backgroundcolor {
  background: linear-gradient(to right bottom, #cc8c30 70%, white 30%);
}
@media only screen and (min-width: 768px) {
  .backgroundcolor {
    background: #cc8c30;
    border-radius: 0 0 50% 50%/0 0 50% 50%;
  }
}
</style>
