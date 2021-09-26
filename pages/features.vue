<template>
  <div class="py-5 min-h-screen">
    <h1 class="text-2xl md:text-4xl font-bold text-center pt-4">Features</h1>
    <h2 class="text-gray-600 text-center mt-2">
      Selling online has never been easier.
    </h2>
    <div
      class="
        container
        max-w-6xl
        mx-auto
        my-10
        md:my-20
        px-4
        grid grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-4
        md:gap-6
      "
    >
      <nuxt-link
        to="#"
        class="
          col-span-1
          text-center
          bg-white
          rounded-md
          shadow-md
          p-3
          md:p-6
          hover:shadow-xl
        "
      >
        <div class="max-w-sm mx-auto">
          <div class="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 md:h-32 md:w-32 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
              <path
                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
              />
            </svg>
          </div>
          <h3 class="text-xl md:text-2xl font-bold mt-4">
            Start selling in minutes
          </h3>
          <p class="my-4 text-gray-600 text-sm">
            Get straight to growing your business. We handle everything to sell
            online. So you can focus on your business rather managing the
            infrastructure.
          </p>
        </div>
      </nuxt-link>

      <nuxt-link
        to="#"
        class="
          col-span-1
          text-center
          bg-white
          rounded-md
          shadow-md
          p-3
          md:p-6
          hover:shadow-xl
        "
      >
        <div class="max-w-sm mx-auto">
          <div class="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 md:h-32 md:w-32 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="text-xl md:text-2xl font-bold mt-4">
            Comprehensive Dashboard
          </h3>
          <p class="my-4 text-gray-600 text-sm">
            Get a holistic and detailed view of your business to better
            understand sales, orders, and customers to better tailor your
            products.
          </p>
        </div>
      </nuxt-link>

      <nuxt-link
        to="#"
        class="
          col-span-1
          sm:col-span-2
          xl:col-span-1
          text-center
          bg-white
          rounded-md
          shadow-md
          p-3
          md:p-6
          hover:shadow-xl
        "
      >
        <div class="max-w-sm mx-auto">
          <div class="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 md:h-32 md:w-32 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fill-rule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 class="text-xl md:text-2xl font-bold mt-4">
            Get Paid Directly and Securely
          </h3>
          <p class="my-4 text-gray-600 text-sm">
            We don't keep your money! The payment goes to you directly as soon
            as a buyer pays.
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import NuxtLink from '~/components/NuxtLink.vue'
export default {
  components: { NuxtLink },

  head() {
    return {
      title: 'Features',
    }
  },
}
</script>

<style></style>
