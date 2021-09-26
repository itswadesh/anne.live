<template>
  <section class="bg-gray-200 w-full md:w-80 text-gray-800 p-8">
    <div v-for="(i, ix) in items" :key="ix">
      <button
        class="
          my-2
          text-start
          focus:outline-none
          lg:whitespace-nowrap
          font-medium
          hover:text-primary-500
        "
        @click="$router.push('#')"
      >
        {{ i.catagories }}
      </button>
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
        { catagories: 'Household' },
        { catagories: 'Diy Tools' },
        { catagories: 'Lifestyle & Accesories' },
      ],
    }
  },
}
</script>
<style></style>
