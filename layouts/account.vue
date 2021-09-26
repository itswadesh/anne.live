<template>
  <section
    class="
      flex flex-col
      w-full
      min-h-screen
      font-sans
      antialiased
      text-gray-900
      bg-gray-50
    "
  >
    <Nav class="fixed w-full top-0 z-50" />

    <div class="w-full h-full flex flex-row justify-center margin-top">
      <div class="hidden lg:block w-64">
        <LeftUserProfile />
      </div>

      <div class="flex-1 min-h-screen">
        <nuxt class="container mx-auto p-2 sm:p-10 flex-1 h-full" />

        <Footer class="mt-auto w-full" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Footer from '~/components/Footer.vue'
import LeftUserProfile from '~/components/User/LeftUserProfile.vue'

import Nav from '~/components/Home/Nav.vue'
export default {
  components: { Nav, Footer, LeftUserProfile },
  head() {
    return this.$nuxtI18nHead()
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  created() {
    // if (!this.user.firstName || this.user.firstName == '') {
    //   this.$router.push('/my/profile')
    // }
  },
}
</script>

<style scoped>
@media (max-width: 1024px) {
  .margin-top {
    margin-top: 6.2rem;
  }
}
@media (min-width: 1024px) {
  .margin-top {
    margin-top: 4.2rem;
  }
}
</style>
