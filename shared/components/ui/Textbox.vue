<template>
  <div class="w-full">
    <!-- $event.target.composing = false -->
    <label class="absolute text-base font-light text-gray-500">
      {{ label }}
    </label>
    <input
      class="
        w-full
        h-10
        text-base
        font-light
        text-gray-500
        border-0
        rounded
        disabled:bg-gray-200 disabled:opacity-50
        ps-4
        ring-1 ring-gray-300
        focus:outline-none
        hover:shadow
        focus:ring-1 focus:ring-primary-500
      "
      :class="[
        right ? 'text-right' : 'text-left',
        err ? 'border-2 border-brand-700 bg-brand-100' : '',
      ]"
      v-bind="$attrs"
      :value="value"
      :placeholder="placeholder"
      :type="type"
      :aria-label="label"
      @input="
        $emit('input', $event.target.value)
        v ? v.$touch() : ''
      "
      @keyup="$emit('keyup', $event.target.value)"
    />
    <span class="highlight"></span>
    <div v-if="err" class="items-center block text-xs text-brand-700">
      <span>{{ err }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorPosition: { type: String, default: 'left' },
    label: { type: String, default: null },
    type: { type: String, default: 'text' },
    value: { type: [Number, String], default: null },
    cls: { type: String, default: null },
    placeholder: { type: String, default: null },
    validate: { type: String, default: null },
    v: { type: Object, default: () => {} },
    err: { type: String, default: null },
    right: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.floating-input {
  font-size: 0.875rem;
}
.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -2px;
  color: #b26e12;
}

label {
  pointer-events: none;
  left: 8px;
  top: 11px;
  transition: 0.2s ease all;
}
</style>
