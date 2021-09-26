<template>
  <div
    v-if="loading"
    class="
      fixed
      z-50
      flex
      items-center
      justify-center
      w-full
      h-full
      bg-gray-200
      opacity-25
      delay
    "
  >
    <img v-lazy="'../../assets/loading.svg'" alt="loading ..." />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    active: { type: Boolean, required: false },
  },
  computed: {
    ...mapGetters({ loading: 'loading' }),
  },
}
</script>
<style scoped>
.delay {
  animation-delay: 0ms;
  animation-duration: 750ms;
  animation-fill-mode: both;
  animation-name: loader-component-keyframes;
}
@keyframes loader-component-keyframes {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}
</style>
