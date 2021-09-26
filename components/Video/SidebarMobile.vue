<template>
  <section class="bg-gray-200 w-full md:w-80 text-gray-800 p-5">
    <div class="flex justify-center space-x-10">
      <div>
        <div v-for="(i, ix) in items" :key="ix" class="my-2 sm:my-4">
          <button
            class="
              text-start
              focus:outline-none
              font-medium
              hover:text-primary-500
              w-24
              sm:w-full
            "
            @click="$router.push('#')"
          >
            {{ i.catagories }}
          </button>
        </div>
      </div>
      <div>
        <div v-for="(ii, ixx) in items2" :key="ixx" class="my-2 sm:my-4">
          <button
            class="
              text-start
              focus:outline-none
              font-medium
              hover:text-primary-500
              w-24
              sm:w-full
            "
            @click="$router.push('#')"
          >
            {{ ii.catagories }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { catagories: 'All Products' },
        { catagories: 'Newly Launched' },
        { catagories: 'Most Popular' },
        { catagories: 'Top Picks' },
      ],
      items2: [
        { catagories: 'Household' },
        { catagories: 'Diy Tools' },
        { catagories: 'Lifestyle & Accesories' },
      ],
    }
  },
}
</script>
<style></style>
