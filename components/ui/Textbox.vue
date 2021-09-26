<template>
  <div class="w-full">
    <h2 class="max-w-max">{{ label }}</h2>
    <input
      class="
        w-full
        p-2
        text-sm
        placeholder-gray-400
        border border-gray-400
        rounded-md
        bg-gray-50
        hover:bg-white hover:border-primary-500
        focus:outline-none
      "
      :class="[
        right ? 'text-end' : 'text-start',
        err ? 'border-2 border-red-700 bg-red-100' : '',
      ]"
      :placeholder="placeholder"
      v-bind="$attrs"
      :value="value"
      :type="type"
      :aria-label="label"
      @blur="$emit('blur', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
    />
    <span class="highlight"></span>
    <!-- <label
      class="absolute text-base font-light"
      :class="err ? 'text-red-700' : 'text-gray-500'"
    >
      {{ label }}
    </label> -->
    <div v-if="err" class="items-center block text-xs text-red-700">
      <span>{{ err }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorPosition: {
      type: String,
      default: 'left',
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: null,
    },
    cls: {
      type: String,
      default: null,
    },
    validate: {
      type: String,
      default: null,
    },
    v: {
      type: Object,
      default: () => {},
    },
    err: {
      type: String,
      default: null,
    },
    right: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.arrow-left {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 5px 0;
  border-color: transparent red transparent transparent;
}
.arrow-right {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent red;
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid red;
}
.arrow-down {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid red;
}
.floating-input {
  font-size: 0.875rem;
}
.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: 2px;
  color: #b26e12;
  font-size: 0.8rem;
}
label {
  pointer-events: none;
  left: 8px;
  top: 11px;
  transition: 0.2s ease all;
}
</style>
