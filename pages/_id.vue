<template>
  <div>
    <div v-if="channel">
      <div
        class="
          pt-2
          text-xl
          p-2
          bg-white
          font-bold
          text-center text-success
          capitalize
        "
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

    <div
      v-if="channel && channel.products && channel.products.length > 0"
      class="container mx-auto p-2 sm:p-10"
    >
      <h2 class="font-bold text-xl mb-5">Products</h2>

      <div class="flex flex-wrap">
        <a
          v-for="p in channel.products"
          :key="p.id"
          :href="`https://${DOMAIN}/${p.slug}?id=${p.id}`"
          target="_blank"
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
          <!-- v-lazy="`${p.img}?tr=h-144,w-144,fo-auto`" -->
          <img
            :src="p.img"
            alt="product"
            class="h-full w-full object-contain object-top"
          />

          <div
            class="
              absolute
              bottom-0
              w-full
              overflow-ellipsis
              h-10
              flex
              frosted
              justify-center
              items-center
            "
          >
            <p class="text-xs text-black line-clamp-2 text-center px-1">
              {{ p.name }}
            </p>
          </div>
        </a>
      </div>

      <!-- <Chats :channel="$route.params.id" class="my-4" /> -->
    </div>
  </div>
</template>

<script>
import HlsPlayer from '~/components/Video/HlsPlayer.vue'
import Chats from '~/components/Chats'
import NuxtLink from '~/components/NuxtLink.vue'
import { DOMAIN } from '~/shared/config/'
export default {
  components: { HlsPlayer, Chats, NuxtLink },
  data() {
    return {
      DOMAIN,
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
