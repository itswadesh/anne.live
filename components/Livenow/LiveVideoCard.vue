<template>
  <section
    v-if="channel"
    class="
      w-full
      border
      rounded-md
      shadow-md
      hover:shadow-lg
      bg-white
      text-gray-800
    "
  >
    <!-- channel section start  -->

    <div class="relative">
      <!-- <a
      
        :href="`https://litekartlive.netlify.app/netease/watch?channelName=${channel.id}`"
        
        target="_blank" -->

      <nuxt-link :to="`/${channel.id}`" class="h-full w-full">
        <img
          v-lazy="channel.imgCdn"
          class="w-full h-40 rounded-t-lg object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </nuxt-link>

      <div
        v-if="channel.isLive"
        class="
          absolute
          right-2
          top-2
          px-1.5
          py-1
          max-w-max
          text-white
          tracking-wider
          leading-3
          font-semibold
          text-xs
          bg-error
          rounded
        "
      >
        LIVE
      </div>
    </div>

    <!-- channel section end -->

    <!-- channel details start  -->
    ---- {{ channel.user.avatar }}
    <div class="p-2 flex justify-start mt-2">
      <img
        v-lazy="channel.user.avatar"
        alt=""
        class="object-cover w-10 h-10 rounded-full border border-gray-300"
      />

      <div class="flex flex-col ms-4">
        <!-- <a :href="`https://litekartlive.netlify.app/netease/watch?channelName=${channel.id}`" -->

        <nuxt-link
          :to="`/${channel.id}`"
          class="font-semibold truncate cursor-pointer hover:text-purple-500"
        >
          {{ channel.title }}
        </nuxt-link>

        <div
          class="
            text-sm
            font-light
            cursor-pointer
            hover:text-purple-500
            max-w-max
          "
        >
          {{ channel.user.firstName }} {{ channel.user.lastName }}
        </div>

        <div class="text-xs font-light max-w-max">
          {{ channel.scheduleDateTime | date }}
        </div>

        <div class="flex mt-2 space-x-2"></div>
      </div>
    </div>

    <!-- channel details end -->
  </section>
</template>

<script>
export default {
  props: {
    channel: { type: Object, default: () => {} },
  },
}
</script>

<style scoped>
.zoom {
  transition: transform 0.7s;
}

.zoom:hover {
  transform: scale(1.035);
}
</style>
