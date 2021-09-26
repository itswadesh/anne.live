<template>
  <div>
    <button
      type="submit"
      :disabled="loading"
      class="
        flex
        items-center
        justify-center
        w-full
        px-5
        py-2
        rounded
        outline-none
      "
      :class="{
        'primary text-white': !loading,
        'border border-gray-400 bg-gray-300': loading,
      }"
    >
      <!-- <img
        v-lazy="`/loading.svg`"
        :class="{ loading: loading }"
        alt
      /> -->
      <span v-if="loading">&nbsp;</span>
      <slot v-else />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ loading: 'loading' }),
  },
}
</script>

<style></style>
