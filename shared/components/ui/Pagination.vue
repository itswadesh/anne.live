<template>
  <div v-if="count > 1" class="flex flex-row w-full items-center">
    <div
      class="
        justify-start
        flex-1 flex-wrap
        w-full
        py-5
        text-xs text-center text-gray-600
        list-none
        lg:text-sm
      "
    >
      <div class="w-full lg:mr-2 text-base font-normal text-gray-600 lg:w-auto">
        Page {{ current }} of {{ count }}
      </div>
      <div class="flex flex-row justify-center w-full lg:w-auto">
        <button
          v-if="current > 1"
          class="
            items-center
            hidden
            p-2
            font-semibold
            bg-white
            border border-gray-400
            rounded
            shadow
            focus:outline-none
            lg:inline-flex lg:mx-5
            hover:bg-gray-100
            text-primary
            lg:py-2 lg:px-4
          "
          rel="prev"
          @click="$emit('change', current - 1)"
        >
          <svg
            class="w-5 h-5 me-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            /></svg
          >&nbsp;
          <span>Previous</span>
        </button>
        <button
          v-for="i in pages"
          :key="i"
          class="flex focus:outline-none"
          @click="$emit('change', i)"
        >
          <div
            v-if="startTab <= i && endTab - 1 >= i"
            class="
              flex flex-wrap
              items-center
              justify-center
              w-8
              h-8
              mx-1
              my-auto
              rounded-full
              outline-none
              focus:outline-none
              hover:bg-gray-200
            "
            :class="{
              'bg-black font-medium focus:outline-none hover:bg-gray-200 text-white tracking-wide ':
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
            items-center
            hidden
            px-4
            py-2
            font-semibold
            bg-white
            border border-gray-400
            rounded
            shadow
            lg:mx-5
            focus:outline-none
            lg:inline-flex
            hover:bg-gray-100
            text-primary
          "
          rel="next"
          @click="$emit('change', current + 1)"
        >
          <span>Next</span>
          &nbsp;
          <svg
            class="w-5 h-5 me-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
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
    pages() {
      const count = this.count
      // let count = this.count > 10 ? 10 : this.count
      return parseInt(count)
    },
    startTab() {
      const val =
        5 - this.current <= 5 && 5 - this.current >= 0 ? 1 : this.current - 4
      // console.log(val)
      return val
    },

    endTab() {
      const val = this.startTab + 9
      // console.log(val)
      return val
      // return (10 - this.current) >= 5 ? 10 : (this.current + 10)
    },
  },
  mounted() {
    // console.log(this.count,this.pages)
  },
  methods: {},
}
</script>
