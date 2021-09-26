<template>
  <section class="w-64 py-3 text-sm bg-gray-100 min-h-screen">
    <!-- Recommended channels section start  -->
    <!-- <div class="flex items-center justify-between px-2">
      <h4 class="font-semibold uppercase">Recommemded Channels</h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div> -->
    <!-- Recommended channels section end -->
    <!-- Channels section start  -->
    <!-- <div class="pt-2">
      <div v-for="(i, ix) in items" :key="ix" class="">
        <nuxt-link
          to="#"
          class="flex flex-row justify-between px-2 py-1 hover:bg-indigo-100"
        >
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full">
              <img
                :src="i.img"
                alt=""
                class="object-cover object-top w-8 h-8 rounded-full"
              />
            </div>
            <div class="ms-2">
              <h5 class="font-semibold">{{ i.name }}</h5>
              <h5 class="w-32 text-sm font-light truncate">
                {{ i.whatsplaying }}
              </h5>
            </div>
          </div>
          <div class="">
            <div class="flex items-center">
              <div class="w-2 h-2 me-1 bg-red-500 rounded-full"></div>
              <span class="text-sm font-light">{{ i.live }}</span>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div> -->
    <!-- Channels section end -->
    <!-- Sign up section start  -->
    <div class="p-4 m-2 bg-white rounded-md shadow-md">
      <h1 class="text-xl font-bold tracking-wide uppercase">
        join the
        <span class="text-purple-500 cursor-pointer">litekart</span>
        community!!!
      </h1>
      <h5 class="mt-1 text-gray-600">
        Discover the best live streams anywhere
      </h5>
      <button
        class="
          px-4
          py-2
          mt-2
          font-bold
          tracking-wide
          text-white
          bg-purple-500
          rounded-md
          shadow-md
          hover:bg-purple-700
          focus:outline-none
        "
      >
        Sign up
      </button>
    </div>
    <!-- Sign up section end -->
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style scoped></style>
