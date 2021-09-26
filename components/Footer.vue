<template>
  <div
    class="
      p-3
      sm:p-5
      w-full
      flex flex-row
      items-center
      justify-center
      whitespace-nowrap
      text-gray-500 text-sm text-center
    "
  >
    <span class="text-base mr-1">©</span
    ><span> Policy 2007-{{ year }} {{ store.name }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
  computed: {
    store() {
      return this.$store.state.store || {}
    },
  },
}
</script>
