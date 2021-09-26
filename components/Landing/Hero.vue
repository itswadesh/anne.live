<template>
  <section class="container mx-auto max-w-7xl px-2 sm:px-10">
    <div class="lg:flex lg:items-start lg:justify-between">
      <div class="mx-2 lg:w-1/2">
        <h1
          class="
            text-5xl
            font-black
            text-center text-gray-800
            md:text-6xl
            lg:text-left
            tracking-wide
            leading-tight
          "
        >
          Start your
          <div class="my-0.5 md:my-2 lg:my-3">ecommerce</div>
          <div class="lg:flex mx-auto max-w-max lg:mx-0 items-start space-x-2">
            <span class="text-5xl md:text-6xl mr-2"> under</span>
            <div class="pt-2 md:pt-0 my-2 flex items-baseline">
              <span class="text-5xl font-black md:text-8xl text-primary-500">
                60
              </span>
              <span class="ml-2 text-sm font-medium text-primary-500">
                seconds
              </span>
            </div>
          </div>

          <!-- <div
            class="
              mt-6
              mx-auto
              lg:mx-0
              text-4xl
              font-bold
              lg:text-5xl
              under
              max-w-max
              px-4
            "
          >
            Free for <span class="text-6xl"> lifetime</span>
          </div> -->
        </h1>

        <div class="flex pt-6">
          <div class="">
            <button
              class="h-2 rounded-l lg:border lg:bg-red-500 lg:px-4 lg:rounded-r"
            ></button>
          </div>

          <div class="lg:text-xl lg:pl-2 mx-auto max-w-max">
            <div
              class="
                flex
                px-5
                text-center
                lg:pl-0
                start
                md:text-lg md:text-center
                lg:text-left
                max-w-lg
              "
            >
              Scale to infinite with scalable ecommerce platform and
              cutting-edge tech stack
            </div>
          </div>
        </div>

        <div class="flex-col mx-5 md:mx-0">
          <div class="flex justify-center lg:justify-start email">
            <a :href="getLoginUrl()">
              <PrimaryButtonRounded
                loadingringsize="lg"
                class="w-72 mt-10 py-3 text-lg"
                :loading="loading"
                @click="loading = true"
              >
                Launch your store now
              </PrimaryButtonRounded>
            </a>

            <!-- <div class="flex mt-10 border-gray-100 lg:mt-20">
              <div
                class="py-2 pl-5 pr-16 text-gray-600 bg-white lg:text-lg lg:pr-40 add md:pr-48 md:py-4"
              >
                Your email adress
              </div>
              <div
                class="px-8 py-2 text-lg text-white bg-brand-700 ss lg:pt-4 md:pt-3 "
              >
                <button>Get started</button>
              </div>
            </div> -->
          </div>

          <!-- <div
            class="flex justify-center pt-20 pb-20 lg:pt-6 lg:justify-start md:pt-8"
          >
            <img src="/img/p.svg" />
          </div> -->

          <!-- <br />
          <br />
          <br />
          <br />
          <nuxt-link to="/csd-contact-form" class="py-4 link">
            Explore Features
          </nuxt-link> -->
        </div>
      </div>

      <div class="pt-10 lg:pt-0 flex justify-center lg:justify-end lg:w-1/2">
        <img
          src="/home/add-to-cart-animate.svg"
          class="w-full h-96 lg:h-full"
        />
        <!-- <video
        id="video-2815857"
        playsinline=""
        muted=""
        autoplay=""
        loop=""
        data-silent="true"
        src="https://cdn.dribbble.com/users/1145170/screenshots/11209707/media/fcfdf9675a7e96984814c04ba47cc0a9.mp4"
      ></video> -->
      </div>
    </div>
  </section>
</template>
<script>
import PrimaryButtonRounded from '~/components/ui/PrimaryButtonRounded.vue'

export default {
  components: { PrimaryButtonRounded },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return (this.$store.state.auth || {}).user
    },
  },
  methods: {
    getLoginUrl() {
      if (this.settings.otpLogin)
        return `${this.settings.ADMIN_PANEL_LINK}/otplogin`
      else return `${this.settings.ADMIN_PANEL_LINK}/login`
    },
  },
}
</script>
<style scoped>
.under {
  background-image: linear-gradient(45deg, #fcdb6f, #fdcf01);
}
</style>
