<template>
  <div>
    <nuxt-link
      :to="`/player?url=${video.url}`"
      class="flex items-center justify-center"
    >
      <img
        v-lazy="video.snapshotUrl"
        alt=""
        class="h-52 w-52 xl:w-full object-cover object-top"
      />
    </nuxt-link>
    <nuxt-link :to="`/player?url=${video.url}`" class="block py-4">
      <h4 class="font-medium">
        {{ video.updateTime | date }}
      </h4>
      <h6 class="mt-2 text-sm text-gray-600">
        Duration: {{ video.duration }} second<span v-if="video.duration > 1"
          >s</span
        >
      </h6>
      <p class="mt-2 text-sm text-gray-600">{{ video.channel }}</p>
      <p v-if="video.user" class="mt-2 text-sm text-gray-600 flex items-center">
        <img
          v-lazy="video.user.avatar"
          alt=""
          class="w-8 h-8 me-1 rounded-full"
        />
        {{ video.user.firstName }} {{ video.user.lastName }}
      </p>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    video: {
      type: Object,
      default: null,
    },
  },
}
</script>
