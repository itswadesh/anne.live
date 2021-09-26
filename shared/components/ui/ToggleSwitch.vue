<template>
  <!-- Toggle Button -->
  <label
    :for="uniqueId"
    class="
      flex
      items-center
      cursor-pointer
      max-w-max
      hover:bg-opacity-90 hover:opacity-90
    "
  >
    <!-- toggle -->
    <div class="relative">
      <input
        :id="uniqueId"
        v-bind="$attrs"
        :checked="value"
        type="checkbox"
        :name="name || uniqueId"
        :disabled="disabled"
        :required="required"
        class="hidden"
        @input="onInput"
      />
      <!-- line -->
      <div
        class="block bg-gray-300 rounded-full"
        :class="{
          'h-5 w-8': size == 'xs',
          'h-6 w-10': size == 'sm',
          'h-9 w-16': size == 'md',
          green: color == 'green',
          blue: color == 'blue',
          red: color == 'red',
          pink: color == 'pink',
          purple: color == 'purple',
          yellow: color == 'yellow',
          indigo: color == 'indigo',
        }"
      ></div>

      <!-- dot -->
      <div
        class="
          absolute
          transition
          duration-300
          ease-in-out
          bg-white
          rounded-full
          dot
          left-1
          top-1
        "
        :class="{
          'h-3 w-3': size == 'xs',
          'h-4 w-4': size == 'sm',
          'h-7 w-7': size == 'md',
        }"
      ></div>
    </div>
    <div
      class="text-sm ml-2 font-semibold"
      :class="{
        green: color == 'green' && value === true,
        blue: color == 'blue' && value === true,
        red: color == 'red' && value === true,
        pink: color == 'pink' && value === true,
        purple: color == 'purple' && value === true,
        yellow: color == 'yellow' && value === true,
        indigo: color == 'indigo' && value === true,
      }"
    >
      <slot>
        <span v-if="value === true && onText">{{ onText }}</span>
        <span v-else-if="offText" class="text-gray-400">{{ offText }}</span>
      </slot>
    </div>
    <!-- <div
      class="slider round"
      :class="value == true ? `slider-${color}` : ''"
    ></div> -->
  </label>
</template>

<script>
export default {
  props: {
    id: { type: String, default: null, required: false },
    color: { type: String, default: 'green', required: false },
    circle: {
      type: Boolean,
      default: false,
      required: false,
    },
    value: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    count: { type: [String, Number], default: null },
    name: { type: String, default: null },
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
    small: {
      type: Boolean,
      required: false,
    },
    size: {
      type: String,
      default: 'md',
      required: false,
    },
    onText: {
      type: String,
      default: null,
      required: false,
    },
    offText: {
      type: String,
      default: null,
      required: false,
    },
    fontSize: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data: () => ({
    checked: false,
    uniqueId: '',
  }),
  mounted() {
    this.genId()
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.checked)
    },
    genId() {
      if (this.id === undefined || typeof String) {
        this.uniqueId = `toggle--${Math.random().toString(36).substring(2, 10)}`
      } else {
        this.uniqueId = this.id
      }
    },
  },
}
</script>

<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
}
input:checked ~ .green {
  @apply bg-secondary-500;
}
input:checked ~ .blue {
  @apply bg-blue-500;
}
input:checked ~ .red {
  @apply bg-brand-700;
}
input:checked ~ .yellow {
  @apply bg-brand-500;
}
input:checked ~ .indigo {
  @apply bg-indigo-500;
}
input:checked ~ .pink {
  @apply bg-pink-500;
}
input:checked ~ .purple {
  @apply bg-purple-500;
}

.green {
  @apply text-secondary-500;
}
.primary {
  @apply text-blue-500;
}
.red {
  @apply text-brand-700;
}
.yellow {
  @apply text-brand-500;
}
.indigo {
  @apply text-indigo-500;
}
.pink {
  @apply text-pink-500;
}
.purple {
  @apply text-purple-500;
}

/* .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider-green {
  background-color: green;
}

input:checked + .slider-blue {
  background-color: blue;
}

input:checked + .slider-red {
  background-color: red;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} */
</style>
