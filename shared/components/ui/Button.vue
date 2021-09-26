<template>
  <!-- :class="{
      'primary text-white': color == 'primary',
      secondary: color == 'none',
    }" -->
  <button
    v-bind="$attrs"
    :size="size"
    class="
      flex
      items-center
      font-light
      text-base
      tracking-widest
      uppercase
      justify-center
      w-full
      text-white
      duration-200
      hover:-translate-y-0.5
      transition
      transform
      ease-in-out
      sm:rounded
      focus:ring-opacity-50 focus:ring focus:ring-offset-2 focus:outline-none
    "
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: null },
    size: { type: String, default: 'text' },
    color: { type: String, default: 'none' },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style scoped></style>
