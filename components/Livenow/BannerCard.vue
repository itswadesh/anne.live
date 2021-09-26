<template>
  <section v-if="banner" class="">
    <nuxt-link :to="banner.link">
      <img v-lazy="banner.img" alt="" class="object-cover w-40 h-52 zoom" />
    </nuxt-link>
    <div class="mt-2">
      <div class="flex flex-col">
        <nuxt-link
          :to="banner.link"
          class="font-semibold truncate cursor-pointer hover:text-purple-500"
        >
          {{ banner.title }}
        </nuxt-link>
        <nuxt-link
          :to="banner.link"
          class="
            my-1
            text-sm
            font-light
            cursor-pointer
            hover:text-purple-500
            max-w-max
          "
        >
          {{ banner.viewers }}
        </nuxt-link>

        <nuxt-link :to="banner.link">
          <button
            class="
              px-3
              py-0.5
              text-gray-700 text-sm
              font-semibold
              bg-gray-200
              rounded-full
              focus:outline-none
              hover:bg-gray-300
            "
          >
            {{ banner.button }}
          </button>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },
  props: {
    banner: { type: Object, default: null },
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
