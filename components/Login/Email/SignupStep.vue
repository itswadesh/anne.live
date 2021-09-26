<template>
  <div class="flex flex-col h-full bg-white cursor-default md:rounded-l-xl">
    <h2 class="text-lg font-bold">
      Get Started in <i class="ms-1 me-2 text-3xl text-primary-500">3</i> Simple
      Steps
    </h2>
    <div class="flex items-start mt-10">
      <div class="py-2 ps-2 pe-3 font-semibold bg-gray-200 rounded-md">
        <i class="text-blue-300"> 01</i>
      </div>
      <div class="flex-1 ms-5">
        <h4 class="font-semibold leading-none">Sign up.</h4>
        <h6 class="mt-1 text-gray-400">Create your {{ store.name }} account</h6>
      </div>
    </div>
    <div class="flex items-start mt-10">
      <div class="py-2 ps-2 pe-3 font-semibold bg-gray-200 rounded-md">
        <i class="text-blue-400"> 02</i>
      </div>
      <div class="flex-1 ms-5">
        <h4 class="font-semibold leading-none">
          Enter the {{ store.name }} Dashboard.
        </h4>
        <h6 class="mt-1 text-gray-400">
          Create a store and get your store URL.
        </h6>
      </div>
    </div>
    <div class="flex items-start mt-10">
      <div class="py-2 ps-2 pe-3 font-semibold bg-gray-200 rounded-md">
        <i class="text-primary-500"> 03</i>
      </div>
      <div class="flex flex-col flex-1 ms-5">
        <h4 class="font-semibold leading-none">Add products to store.</h4>
        <nuxt-link to="#" class="mt-1 text-gray-400 hover:text-primary-500">
          Add product and start selling
        </nuxt-link>
      </div>
    </div>
    <div class="flex items-center mt-10">
      <div class="py-2 ps-2 pe-3 font-semibold bg-gray-200 rounded-md">
        <i class="text-primary-500"> GO</i>
      </div>
      <div class="flex-1 ms-5">
        <h4 class="font-semibold leading-none">Building Now.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  computed: {
    ...mapGetters({
      store: 'store',
    }),
  },
}
</script>

<style scoped>
.virticalalign {
  vertical-align: text-bottom;
}
</style>
