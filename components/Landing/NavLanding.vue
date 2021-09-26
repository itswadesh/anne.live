<template>
  <nav class="w-full fixed top-0 z-50 frosted shadow">
    <div class="container mx-auto max-w-7xl px-2 sm:px-10">
      <div class="flex items-center justify-between p-3">
        <div class="flex items-center w-full">
          <nuxt-link
            to="/"
            title="Link to home page"
            rel="prefetch"
            aria-label="ShopNx"
            class="
              flex
              items-center
              text-3xl
              font-bold
              underline
              nuxt-link-active
            "
            ><img src="/icon.png" alt="" class="h-10 mr-2" />
          </nuxt-link>
        </div>
        <div
          class="
            flex
            items-center
            flex-shrink-0
            text-xs
            font-semibold
            tracking-wide
          "
        >
          <nav class="flex items-center">
            <a
              :href="getLoginUrl()"
              title="Login"
              class="mr-5 text-primary-500"
            >
              Login
            </a>
            <a :href="getLoginUrl()" title="Get Started" rel="prefetch">
              <PrimaryButtonRounded
                class="w-28"
                type="button"
                loadingringsize="xs"
                :loading="loading"
                @click="loading = true"
              >
                Get Started
              </PrimaryButtonRounded>
            </a>
          </nav>

          <!-- <button
            aria-label="Open Menu"
            class="p-2 bg-gray-100 rounded focus:outline-none lg:hidden"
          >
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 fill-current"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2 12a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM2 6a1 1 0
              011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM2 18a1 1 0 011-1h18a1 1 0
              110 2H3a1 1 0 01-1-1z"
              ></path>
            </svg>
          </button> -->
        </div>
      </div>
    </div>
  </nav>
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
.nav {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  text-transform: uppercase;
  display: block;
}
.btn {
  display: block;
  background-image: url(/right-shadow.svg), url(/right-chevron.svg);
  background-position: 107% 100%, 90% 50%;
  background-size: auto 140%, 6px 740px;
  background-repeat: no-repeat, no-repeat;
  background-attachment: scroll, scroll;
}
.btn-yellow {
  box-shadow: 1px 1px 3px 0 #fdc700;
  background-color: #fdc700;
  padding-left: 2rem;
  padding-right: 2rem;
  font-weight: 600;
  --text-opacity: 1;
  color: #000;
  color: rgba(0, 0, 0, var(--text-opacity));
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --transform-translate-x: 0;
  --transform-translate-y: 0;
  --transform-rotate: 0;
  --transform-skew-x: 0;
  --transform-skew-y: 0;
  --transform-scale-x: 1;
  --transform-scale-y: 1;
  transform: translateX(var(--transform-translate-x))
    translateY(var(--transform-translate-y)) rotate(var(--transform-rotate))
    skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y))
    scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));
}
.frosted {
  backdrop-filter: blur(12px);
  background-color: hsla(0, 0%, 100%, 0.6);
}
</style>
