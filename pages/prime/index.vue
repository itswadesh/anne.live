<template>
  <section class="flex bg-gray-100 border-2 border-gray-800">
    <div class="w-full">
      <div class="">
        <h4 class="pb-2 font-semibold tracking-wide">All Prime Video Calls</h4>
        <div class="flex flex-wrap justify-start w-full my-5">
          <nuxt-link
            v-for="(i, ix) in items"
            :key="ix"
            :to="`/live/prime/${i.id}`"
            :product="i"
            class=""
          >
            {{ ix + 1 }}
            {{ i.title }}
            <div>{{ i.products.length }} products</div>
            <div>
              {{ i.user.firstName }}
              {{ i.user.lastName }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import Sidebar from '~/components/Livenow/Sidebar.vue'
// import Livenow from '~/components/Livenow/Livenow.vue'
import CHANNELS from '~/gql/channel/channels.gql'
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: {
    NuxtLink,
    // Sidebar,
    // Livenow,
  },
  data() {
    return {
      items: null,
    }
  },

  head() {
    return {
      title: 'Live (Prime) ',
    }
  },

  async created() {
    this.items = (await this.$get('channel/channels', {})) || []
    // this.items =
    //   (
    //     await this.$apollo.query({
    //       query: CHANNELS,
    //       fetchPolicy: 'no-cache',
    //     })
    //   ).data.channels.data || []
  },
}
</script>

<style></style>
