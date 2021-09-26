<template>
  <nuxt-link v-bind="{ ...$props, ...$attrs }" :to="to">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: { to: { type: String, default: '/' } },
  computed: {
    toWithPrefix() {
      return `${this.to}`
    },
  },
}
</script>
