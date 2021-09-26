<template>
  <div>
    <div v-if="$store.state.errors && $store.state.errors.length" class="err">
      <span v-for="(e, ix) in $store.state.errors" :key="ix">{{ e }}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>

<style scoped>
.err {
  /* Can't replace with tailwind classes because it is used in vuetify also*/
  background-color: pink;
  color: black;
  font-size: 0.8rem;
  padding: 1rem 1rem;
}
</style>
