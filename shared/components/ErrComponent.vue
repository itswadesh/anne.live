<template>
  <div v-if="error" class="err">
    <div
      v-if="
        error.toString() ==
        'Network error: Unexpected token E in JSON at position 0'
      "
    >
      Unable to connect to server
    </div>
    <div v-else>{{ error.toString() }}</div>
  </div>
</template>
<script>
export default {
  props: {
    error: { type: String, default: null },
  },
  //  ['error'],
}
</script>
