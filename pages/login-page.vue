<template>
  <div class="z-0">
    <UserLogin />
  </div>
</template>

<script>
import UserLogin from '~/components/Login/Email/UserLogin.vue'
export default {
  components: { UserLogin },
  head() {
    return {
      title: `Login | ${this.store.name || ''}`,
    }
  },
}
</script>
