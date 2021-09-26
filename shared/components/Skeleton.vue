<template>
  <div class="flex flex-wrap">
    <div
      v-for="(p, ix) in skeletonCount"
      :key="ix + '-1'"
      class="xs:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"
    >
      <div class="mt-3 border-0 lg:p-2">
        <img class="w-full border-0" style="height: 280px" alt />
        <div>
          <span class></span>
          <span class></span>
          <span class></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      skeletonCount: 8,
    }
  },
}
</script>
<style scoped></style>
