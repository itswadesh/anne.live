<template>
  <label class="cursor-pointer flex items-center text-gray-800" :class="color">
    <!-- class="w-4 h-4 my-auto bg-gray-100 text-primary-500 focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0" -->

    <input
      type="radio"
      :checked="checked"
      :value="value"
      class="
        w-4
        h-4
        cursor-pointer
        focus:ring-0
        text-primary-500
        focus:ring-offset-0
      "
      @change="updateInput"
    />

    <div class="text-sm text-gray-800 ms-2">
      <slot />
    </div>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    value: {
      type: [String, Object, Number],
      default: null,
    },

    modelValue: { type: [String, Object, Array], default: null },

    color: { type: String, default: 'primary' },
  },

  computed: {
    checked() {
      return this.modelValue === this.value
    },
  },

  methods: {
    updateInput() {
      this.$emit('change', this.value)
    },
  },
}
</script>
