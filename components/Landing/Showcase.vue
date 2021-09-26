<template>
  <section
    class="
      container
      mx-auto
      max-w-7xl
      px-2
      sm:px-10
      flex flex-col
      text-gray-800
    "
  >
    <nuxt-link
      v-for="(i, ix) in items"
      :key="ix"
      :ix="ix"
      to="#"
      rel="prefetch"
      class="
        flex flex-col-reverse
        lg:flex-row lg:items-center
        justify-center
        lg:justify-between
        mb-5
        md:mb-10
      "
    >
      <!-- Image section start  -->
      <div
        class="w-full lg:w-1/2 pb-10"
        :class="ix % 2 == 0 ? '' : 'lg:order-1'"
      >
        <img v-lazy="i.img" class="w-full h-96 lg:h-full object-contain" />
      </div>
      <!-- Image section end -->

      <!-- Data section start  -->
      <div
        class="flex-1 w-full max-w-lg mx-auto lg:mx-0 lg:w-1/2 pb-10"
        :class="
          ix % 2 == 0 ? 'lg:order-2 lg:ms-auto lg:ps-5' : 'lg:me-auto lg:pe-5'
        "
      >
        <div class="text-center lg:text-left tracking-wide leading-loose">
          <h5 class="uppercase text-gray-700 tracking-normal">
            {{ i.title }}
          </h5>
          <h1 class="mt-5 text-3xl sm:text-4xl font-black">
            {{ i.heading }}
          </h1>
          <p class="mt-5">
            {{ i.description }}
          </p>
        </div>
      </div>
      <!-- Data section end -->
    </nuxt-link>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          link: '#',
          title: 'Headless, Performant, API Driven',
          heading:
            'Start with the rock-solid foundation of a powerful ecommerce platform',
          description: `We have made greater progress building search and filters, Meet the flexible, open SaaS platform leading a new era of ecommerce. Explore limitless possibilities`,
          img: '/home/peace-of-mind.svg',
        },
        {
          link: '#',
          title: 'Outperform the Competition',
          heading: 'Scale and grow smarter without complexity',
          description: `Lightning-fast ecommerce experiences for your customers that keep your customers delighted while browsing products. Powerfull search and filter capabilities for your customers to find the right product they need in no time. Hence improve in the conversion rate`,
          img: '/home/in-no-time-animate.svg',
        },
        {
          link: '#',
          title: 'Top notch technology',
          heading: 'Operate without worry, automate your work',
          description: `Start free and expand as you grow. We stay with you. Our platform capable of handling 20,000 transactions / second with the cutting edge technology. Stay agile and integrate new features as your business requirements. We have all the tools and technologies for your ecommerce business out-of-the-box so that you can spend more time in invention`,
          img: '/home/catalogue-animate.svg',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
