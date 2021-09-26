<template>
  <div v-if="count > 1" class="flex flex-col w-full">
    <div
      class="
        flex flex-col
        py-5
        md:py-10
        justify-center
        w-full
        text-xs
        pagination-container
        lg:text-sm
      "
    >
      <div class="w-full text-center">Page {{ current }} of {{ count }}</div>
      <div
        class="
          flex flex-row flex-wrap
          items-center
          justify-center
          w-full
          md:w-full
          lg:w-auto
          mt-4
        "
      >
        <button
          v-if="current > 1"
          class="
            flex
            items-center
            py-2
            ps-4
            pe-6
            font-semibold
            bg-white
            border border-transparent
            hover:border-gray-400
            rounded-full
            shadow
            hover:bg-gray-300
            focus:outline-none
            active:scale-95
          "
          rel="prev"
          @click="$emit('change', current - 1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            /></svg
          >&nbsp;
          <span>Previous</span>
        </button>
        <button
          v-for="i in count"
          :key="i"
          class="flex focus:outline-none"
          @click="$emit('change', i)"
        >
          <div
            v-if="startTab <= i && endTab - 1 >= i"
            class="
              flex
              items-center
              justify-center
              p-2
              mx-2
              border border-transparent
              rounded-full
              hover:text-black hover:border-gray-400
              w-9
              h-9
              hover:bg-gray-300
              focus:outline-none
              active:scale-95
            "
            :class="{
              'bg-purple-900 p-2 font-medium text-white  tracking-wide':
                current == i,
            }"
          >
            {{ i }}
          </div>
        </button>
        <!-- inline-flex -->
        <button
          v-if="current < count"
          class="
            flex
            items-center
            py-2
            pe-4
            ps-6
            p-2
            font-semibold
            bg-white
            border border-transparent
            hover:border-gray-400
            rounded-full
            shadow
            hover:bg-gray-300
            focus:outline-none
            active:scale-95
          "
          rel="next"
          @click="$emit('change', current + 1)"
        >
          <span>Next</span>
          &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1,
    },
    current: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    startTab() {
      const val =
        5 - this.current <= 5 && 5 - this.current >= 0 ? 1 : this.current - 4
      return val
    },
    endTab() {
      const val = this.startTab + 9
      return val
    },
  },
}
</script>
