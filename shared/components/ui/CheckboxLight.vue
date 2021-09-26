<template>
  <label class="flex cursor-pointer custom-label" :for="id || uniqueId">
    <div class="flex items-center justify-center w-6 h-6 p-1 bg-white shadow">
      <input
        :id="id || uniqueId"
        type="checkbox"
        class="hidden"
        :name="name"
        :value="value"
        :disabled="disabled"
        :required="required"
        :color="color"
        :checked="checkboxState"
        @click="toggle"
      />
      <svg
        class="hidden w-4 h-4 text-secondary-500 pointer-events-none"
        viewBox="0 0 172 172"
      >
        <g
          fill="none"
          stroke-width="none"
          stroke-miterlimit="10"
          font-family="none"
          font-weight="none"
          font-size="none"
          text-anchor="none"
          style="mix-blend-mode: normal"
        >
          <path d="M0 172V0h172v172z" />
          <path
            d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
            fill="currentColor"
            stroke-width="1"
          />
        </g>
      </svg>
    </div>
    <span
      v-if="color"
      data-colorhex="black"
      class="colour-label colour-colorDisplay"
      :style="{ 'background-color': color }"
    ></span>
    <span class="select-none">
      <slot />
    </span>
    <span v-if="count" class="text-xs text-gray-500">({{ count }})</span>
  </label>
</template>
<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    singular: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: false,
      default: null,
    },
    model: {
      type: String | Array,
      default: undefined,
    },
    color: {
      type: String,
      required: false,
      default: null,
    },
    circle: {
      type: Boolean,
      default: false,
      required: false,
    },
    checked: {
      type: Boolean,
      required: false,
    },
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    count: {
      type: [String, Number],
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: Number,
      required: false,
      default: 0,
    },
    fontSize: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data: () => ({
    uniqueId: '',
  }),
  computed: {
    checkboxState() {
      if (this.model instanceof Array) {
        return this.model.includes(this.value)
      }
      return this.model
    },
  },
  watch: {
    checked(v) {
      if (v !== this.checkboxState) this.toggle()
    },
  },
  mounted() {
    this.genId()
    if (this.checked && !this.checkboxState) {
      this.toggle()
    }
  },
  methods: {
    toggle(event) {
      const isChecked = event.target.checked
      if (this.model instanceof Array) {
        const newValue = [...this.model]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked)
      }
    },

    genId() {
      if (this.id === undefined || typeof String) {
        this.uniqueId = `m-checkbox--${Math.random()
          .toString(36)
          .substring(2, 10)}`
      } else {
        this.uniqueId = this.id
      }
    },
  },
}
</script>
<style>
.custom-label input:checked + svg {
  display: block !important;
}
</style>
