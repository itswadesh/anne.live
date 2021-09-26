<template>
  <div>
    <div class="flex">
      <div class="w-full mx-4 lg:w-1/3 md:w-1/2 xl:w-1/4">
        <SkeletonCard />
      </div>
      <div class="hidden w-1/2 mx-4 md:block xl:w-1/4 lg:w-1/3 md:w-1/2">
        <SkeletonCard />
      </div>
      <div class="hidden w-1/4 mx-4 lg:block lg:w-1/3 xl:w-1/4 md:w-1/2">
        <SkeletonCard />
      </div>
      <div class="hidden w-1/4 mx-4 xl:block">
        <SkeletonCard />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
