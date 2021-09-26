<template>
  <div class="group">
    <center>
      <div class="floating-form">
        <div
          class="
            floating-label
            border-l border-t border-r border-gray-300
            rounded-md
          "
        >
          <textarea
            class="
              pt-4
              pl-2.5
              p-2
              w-full
              bg-gray-50
              rounded-md
              floating-input
              hover:bg-white
              focus:outline-none
            "
            placeholder=" "
            v-bind="$attrs"
            :value="value"
            :type="type"
            :aria-label="label"
            :rows="rows"
            @input="$emit('input', $event.target.value)"
            @blur="$emit('blur', $event.target.value)"
            @change="$emit('change', $event.target.value)"
          />
          <span class="highlight"></span>
          <label>{{ label }}</label>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: null },
    type: { type: String, default: 'text' },
    value: { type: String, default: null },
    rows: { type: Number, default: 4 },
  },
}
</script>

<style scoped>
textarea {
  overflow: auto;
}
.floating-label {
  position: relative;
  margin-bottom: 20px;
}
.floating-input {
  display: block;
  width: 100%;
  border: none;
  overflow: auto;
}

.floating-input {
  border-bottom: 2px solid rgba(209, 213, 219, 1);
}

.floating-input:focus {
  outline: none;
  border-bottom: 2px solid rgba(0, 0, 255, 0.555);
}

label {
  font-size: 1rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 8px;
  top: 11px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  @apply text-gray-500;
}

.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -2px;
  font-size: 0.875rem;
  @apply text-primary-500;
}

.floating-select:focus ~ label,
.floating-select:not([value='']):valid ~ label {
  top: -18px;
  font-size: 14px;
  color: #fb6340;
}
</style>
