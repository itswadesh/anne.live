<template>
  <div>
    <div v-if="channel" class="bg-red-100">
      <div
        class="pt-2 text-xl p-2 bg-white font-bold text-center text-green-500"
      >
        {{ channel.title }}
      </div>
      <hls-player :src="channel.hlsPullUrl" />
      <!-- <video
        autoplay
        muted
        :srcObject.prop="channel.hlsPullUrl"
        width="500"
        height="500"
      />; -->
    </div>
    <div v-if="channel && channel.products && channel.products.length > 0">
      <h2 class="font-bold text-xl my-4 ms-2">Products</h2>
      <div class="flex flex-wrap">
        <nuxt-link
          v-for="p in channel.products"
          :key="p.id"
          :to="`/${p.slug}?id=${p.id}`"
          class="
            relative
            m-1
            bg-white
            border-2 border-gray-300
            h-36
            group
            w-36
            hover:border-blue-500
          "
        >
          <img v-lazy="p.img" alt="" class="w-32 h-32 mx-auto" />
          <div class="absolute bottom-0 w-full">
            <p
              class="
                text-xs text-black
                h-10
                flex
                frosted
                text-center
                justify-center
                items-center
                px-1
              "
            >
              {{ p.name }}
            </p>
          </div>
        </nuxt-link>
      </div>
      <!-- <Chats :channel="$route.params.id" class="my-4" /> -->
    </div>
  </div>
</template>

<script>
import HlsPlayer from '~/components/Video/HlsPlayer.vue'
import Chats from '~/components/Chats'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { HlsPlayer, Chats, NuxtLink },
  data() {
    return {
      channel: null,
    }
  },
  async created() {
    try {
      this.channel =
        (await this.$get('channel/channel', { id: this.$route.params.id })) ||
        {}
    } catch (e) {}
  },
}
</script>

<style scoped>
.frosted {
  backdrop-filter: blur(12px);
  background-color: hsla(0, 0%, 100%, 0.3);
}
</style>
