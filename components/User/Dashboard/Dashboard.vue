<template>
  <section class="container mx-auto">
    <!-- <nuxt-link
      :to="'/'"
      class="relative w-full py-2 mb-6 text-blue-500 underline top-2 sm:hidden"
      >Back to home
    </nuxt-link> -->

    <div
      class="
        mb-5
        grid grid-cols-1
        gap-4
        sm:gap-5 sm:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-3
      "
    >
      <nuxt-link
        v-for="(i, ix) in dashboardMenuItems"
        :key="ix"
        :to="i.link"
        class="
          transition
          duration-300
          ease-in-out
          transform
          bg-white
          border
          rounded-md
          cursor-pointer
          shadow-md
          hover:shadow-lg
        "
      >
        <div class="flex flex-row items-start p-5">
          <span
            class="w-20 h-20 my-auto text-primary-500 me-5"
            v-html="i.icon"
          />

          <div class="flex-1 flex flex-col">
            <span class="mb-2 text-lg font-semibold text-primary-500">{{
              i.text
            }}</span>

            <span class="text-xs md:text-sm text-gray-500">
              {{ i.description }}
            </span>
          </div>
        </div>
      </nuxt-link>
    </div>

    <FAQ />
  </section>
</template>
<script>
import FAQ from '~/components/User/Dashboard/FAQ.vue'
import NuxtLink from '~/components/NuxtLink.vue'

export default {
  components: { FAQ, NuxtLink },

  middleware: ['isAuth'],

  data() {
    return {
      dashboardMenuItems: [
        {
          link: '/my/orders',
          text: 'My Orders',
          description:
            'All Orders, tracking orders, return items, manage orders.',
          icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            />
          </svg>`,
        },

        {
          link: '/my/profile',
          text: 'My Profile',
          description:
            'Edit Login Details, password setup, Edit fisrt and last name, number',
          icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>`,
        },

        {
          link: '/my/wishlist',
          text: 'My Wishlist',
          description: 'Wishlist',
          icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>`,
        },

        {
          link: '/my/reviews',
          text: 'My Reviews',
          description: 'product reviews',
          icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>`,
        },

        {
          link: '/my/manage-address',
          text: 'Manage Address',
          description: 'Add, Edit, Delete your saved address',
          icon: `<svg xmlns="http://www.w3.org/2000/svg"" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>`,
        },

        //         {
        //           link: '/my/demo-requests',
        //           text: 'Demo Requests',
        //           description: 'All your prime demo requests',
        //           icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        //   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        // </svg>`,
        //         },

        // {
        //   role: 'user',
        //   link: '/my/giftcards',
        //   text: 'Gift Cards',
        //   description: 'Manage GIft cards, use cards Redeem and refer to earn.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 20 20"
        //     fill="currentColor"
        //   >
        //     <path
        //       fill-rule="evenodd"
        //       d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
        //       clip-rule="evenodd"
        //     />
        //     <path
        //       d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"
        //     />
        //   </svg>`,
        // },

        // {
        //   role: 'admin',
        //   link: '/my/credits',
        //   text: 'Creadit Points',
        //   description:
        //     'Manage your earn points, redeem, share, refer to earn points.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     stroke="currentColor"
        //   >
        //     <path
        //       stroke-linecap="round"
        //       stroke-linejoin="round"
        //       stroke-width="2"
        //       d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
        //     />
        //   </svg>`,
        // },

        // {
        //   role: 'user',
        //   link: '/my/profile',
        //   text: 'Notifications',
        //   description: 'Manage, delete, schedule your Notifications.',
        //   icon: `<svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 20 20"
        //     fill="currentColor"
        //   >
        //     <path
        //       d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
        //     />
        //   </svg>`,
        // },
      ],
    }
  },

  computed: {
    user() {
      return (this.$store.state.auth || {}).user
    },
  },
}
</script>
