<template>
  <!-- component -->
  <div
    class="
      flex
      items-center
      justify-center
      w-full
      h-screen
      p-5
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
        lg:min-h-screen
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
        <div class="my-3 text-4xl font-semibold tracking-wider text-center">
          <a href="#">Hello</a>
        </div>
        <span class="mt-6 font-normal text-center text-white md:mt-0">
          Explore cart, wishlist, products, and more..
        </span>
        <div
          class="
            flex flex-col
            items-center
            justify-center
            w-full
            mt-10
            text-center
          "
        >
          <span>Don't have an account?</span>
          <!-- go to register-page -->
          <nuxt-link :to="localePath('/signup')" class="mt-4">
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
              Sign up
            </button>
          </nuxt-link>
        </div>
        <div class="mt-6 text-sm text-center text-gray-300">
          Read our
          <a href="#" class="underline">terms</a> and
          <a href="#" class="underline">conditions</a>
        </div>
      </div>
      <!--  -->
      <!-- <div class="flex items-center justify-center">
        <img
          src="/img/69-512.png"
          alt="login"
          class="absolute hidden object-contain w-32 h-32 z-1 lg:flex"
        />
      </div> -->

      <!-- <div class="flex items-center justify-center">
        <img
          src="/img/69-512.png"
          alt="login"
          class="absolute object-contain w-28 h-30 z-1 md:hidden"
        />
      </div> -->
      <!--  -->
      <div
        v-if="login"
        class="
          flex
          justify-center
          flex-col
          p-6
          my-auto
          bg-white
          lg:p-3 lg:px-20
          md:flex-1
        "
      >
        <div class="flex justify-center sm:-mt-10 h-36 lg:py-1">
          <img
            v-lazy="store.logo"
            :alt="store.name"
            class="object-contain h-40 w-44"
          />
          <!-- <img v-lazy="store.logoMobile" alt="" class="w-32 h-20" /> -->
        </div>
        <span class="mb-4 font-medium text-center text-primary-500">
          SignIn using email and password
        </span>
        <!-- <span class="flex flex-row items-center justify-center pb-3">
          <nuxt-link to="/">
            <img
              src="/img/social-facebook.png"
              alt="fb"
              class="object-contain w-8 h-8 border rounded-full shadow-lg hover:opacity-75"
            />
          </nuxt-link>
          <nuxt-link to="/">
            <img
              src="/img/social-linkedin-circle.png"
              alt="in"
              class="object-contain w-8 h-8 mx-4 border rounded-full shadow-lg hover:opacity-75"
            />
          </nuxt-link>
          <nuxt-link to="/">
            <img
              src="/img/googl.jpg"
              alt="google"
              class="object-contain w-8 h-8 border rounded-full shadow-lg hover:opacity-75"
            />
          </nuxt-link>
        </span>-->
        <!-- <span class="py-3 text-sm text-center text-gray-500">
          Or you can use your account
        </span> -->
        <form
          novalidate
          autocomplete="off"
          class="flex flex-col px-0 space-y-5 md:px-10 lg:px-7"
          @submit.stop.prevent="submit"
        >
          <div class="flex flex-col space-y-1">
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter Your Email"
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
          </div>
          <div class="flex flex-col space-y-1">
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Enter Password"
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
          <div class="flex items-center justify-end space-x-2">
            <!-- <div>
              <input
                type="checkbox"
                id="remember"
                class="w-4 h-4 transition duration-300 border-none rounded text-primary-500 focus:ring-2 focus:ring-yellow-600 focus:ring-offset-0 focus:outline-none ring-1 ring-yellow-600"
              />
              <label for="remember" class="text-sm font-semibold text-gray-500"
                >Remember me!!</label
              >
            </div> -->
            <div class="flex items-center justify-between">
              <span class="text-white">1</span>
              <nuxt-link :to="'/forgot-password'">
                <span
                  href="#"
                  class="float-right text-sm text-secondary-500 hover:underline"
                >
                  Forgot Password?
                </span>
              </nuxt-link>
            </div>
          </div>
          <div class="flex justify-center w-full mx-auto">
            <button
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
                hover:opacity-80
              "
            >
              <span>Sign In</span>
            </button>
          </div>
          <!-- <nuxt-link to="/signup" class="flex justify-center">Signup</nuxt-link> -->
        </form>
      </div>
      <div
        v-if="settings.ADMIN_PANEL_LINK"
        class="mb-4 text-center hover:text-primary-500"
      >
        <nuxt-link :to="`${settings.ADMIN_PANEL_LINK}`"
          >Merchant Login</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  data() {
    return {
      email: '',
      password: '',
      error: null,
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
          await this.login({
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
      } finally {
        // this.success()
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
