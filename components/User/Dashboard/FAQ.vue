<template>
  <section v-if="faqs && faqs.count > 0" class="mb-32 md:mt-10 text-gray-800">
    <div class="mb-3 text-lg font-semibold tracking-wide">
      Frequently Asked Questions
    </div>
    <div class="border-l border-t border-r rounded-lg overflow-hidden">
      <div
        v-for="(f, ix) in faqs.data"
        :key="ix"
        class="border-b"
        :class="f.opened ? 'bg-white' : 'bg-gray-50'"
        @click="f.opened = !f.opened"
      >
        <div
          class="
            px-4
            sm:px-8
            pt-4
            sm:pt-8
            cursor-pointer
            flex
            items-start
            justify-between
          "
          :class="f.opened ? 'pb-1' : 'pb-4 sm:pb-8'"
        >
          <span class="flex-1 text-sm sm:text-base font-medium">
            {{ f.question }}
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 sm:h-6 transition duration-300 text-gray-500"
            :class="
              f.opened ? 'transform rotate-45 transition duration-300' : ''
            "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </div>

        <div
          v-if="f.opened"
          class="
            px-4
            sm:px-8
            pt-4
            pb-4
            sm:pb-8
            text-gray-500 text-xs
            sm:text-sm
            animate-dropdown
          "
        >
          {{ f.answer }}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      faqs: null,
    }
  },
  async created() {
    await this.getFaqs()
  },

  methods: {
    async getFaqs() {
      try {
        this.faqs = await this.$get('faq/faqs', {})
      } catch (e) {}
    },
  },
}
</script>
