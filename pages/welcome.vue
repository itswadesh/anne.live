<template>
  <section>
    <NavLanding />

    <Hero class="mt-24 sm:mt-32" />

    <Showcase class="mt-16 sm:mt-20" />

    <Cta class="my-16 sm:my-20" />
  </section>
</template>

<script>
import Hero from '~/components/Landing/Hero'
import NavLanding from '~/components/Landing/NavLanding'
import Cta from '~/components/Landing/Cta'
import Showcase from '~/components/Landing/Showcase'

export default {
  components: { Hero, NavLanding, Cta, Showcase },

  layout: 'none',

  head() {
    return {
      title: 'Welcome',
    }
  },
}
</script>

<style scoped></style>
