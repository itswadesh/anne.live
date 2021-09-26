<template>
  <div class="flex py-2">
    <!-- @click="$emit('input', i)" -->
    <button
      v-for="i in 5"
      :key="i"
      type="button"
      class="focus:outline-none"
      :class="{ 'me-1': i < 5 }"
      @click="$emit('input', i)"
    >
      <svg
        class="block w-8 h-8"
        :class="[select >= i ? 'text-secondary-500' : 'text-gray-400']"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        @click="onSelect(i)"
      >
        <path
          d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
        />
      </svg>
    </button>
    <!-- {{select}} -->
    <span
      v-if="select == 1"
      class="my-auto text-sm font-medium text-brand-700 ms-3"
    >
      Very Disappointed
    </span>
    <span
      v-if="select == 2"
      class="my-auto text-sm font-medium text-brand-400 ms-3"
    >
      Slightly Disapponted
    </span>
    <span
      v-if="select == 3"
      class="my-auto text-sm font-medium ms-3 text-secondary-500"
    >
      Good
    </span>
    <span
      v-if="select == 4"
      class="my-auto text-sm font-medium ms-3 text-secondary-200"
    >
      Very Good
    </span>
    <span
      v-if="select == 5"
      class="my-auto text-sm font-medium ms-3 text-secondary-500"
    >
      Awesome
    </span>
  </div>
</template>

<script>
export default {
  props: {
    val: { type: Number, default: 0 },
  },
  data() {
    return {
      select: 0,
    }
  },
  methods: {
    onSelect(val) {
      this.select = val
    },
  },
}
</script>
