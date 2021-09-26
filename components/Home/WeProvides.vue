<template>
  <section v-if="brand" class="w-full">
    <div class="items-center justify-center lg:p-5 lg:flex">
      <div
        v-for="(i, ix) in items"
        :key="ix"
        class="items-center hidden my-auto me-5 lg:flex"
      >
        <img
          :src="i.img"
          class="w-4 h-4 rounded-full lg:h-6 lg:w-6 xl:h-8 xl:w-8"
        />
        <h6
          class="flex-1 ms-2 text-sm lg:text-base whitespace-nowrap"
          v-html="i.detail"
        ></h6>
      </div>

      <!-- Logo section start  -->
      <div
        class="flex flex-row items-center justify-center p-3 space-x-3 lg:p-0"
      >
        <a
          v-for="(s, sx) in socialmedias"
          v-if="s.link"
          :key="sx"
          target="_blank"
          :href="s.link"
        >
          <img
            :src="s.img"
            class="
              w-4
              h-4
              rounded-full
              cursor-pointer
              lg:h-6 lg:w-6
              xl:h-8 xl:w-8
            "
          />
        </a>
      </div>
      <!-- Logo section end -->
    </div>
  </section>
</template>

<script>
export default {
  props: {
    brand: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      items: [
        {
          img: '/img/other/tick.png',
          detail: '15 days <b>money back guarantee</b>',
        },
        {
          img: '/img/other/support.png',
          detail: '<b>Customer</b> Support Team',
        },
        {
          img: '/img/other/lock.png',
          detail: '<b>Safe & Secure</b> online payment',
        },
      ],
      socialmedias: [
        {
          // link: `https://www.facebook.com/${this.brand.facebookUrl}`,
          link: `${this.brand.facebookUrl}`,
          img: '/img/socialmedia/facebook.png',
        },
        {
          // link: `https://twitter.com/${this.brand.twitterUrl}`,
          link: `${this.brand.twitterUrl}`,
          img: '/img/socialmedia/twitter.png',
        },
        {
          // link: `https://www.instagram.com/${this.brand.instaUrl}`,
          link: `${this.brand.instaUrl}`,
          img: '/img/socialmedia/instagram.png',
        },
        {
          // link: `https://www.youtube.com/user/${this.brand.youtubeUrl}`,
          link: `${this.brand.linkedinUrl}`,
          img: '/img/socialmedia/linkedin.png',
        },
        {
          // link: `https://www.youtube.com/user/${this.brand.youtubeUrl}`,
          link: `${this.brand.youtubeUrl}`,
          img: '/img/socialmedia/youtube.png',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
