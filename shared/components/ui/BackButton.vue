<template>
  <button type="button" class="btn nav hover:bg-gray-100" @click="go()">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 ms-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
    <canvas height="0" width="0" class="canvas"></canvas>
  </button>
</template>

<script>
export default {
  props: {
    to: { type: String, default: null },
  },
  methods: {
    go() {
      this.to ? this.$router.push(`${this.to}`) : this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.btn {
  z-index: 10;
  height: 3.5rem;
  border: 0;
  width: 4rem;
  background: #fff;
  border-radius: 0;
}
.nav {
  position: absolute;
  border-radius: 0px 50px 50px 0px;
  box-shadow: rgb(224, 224, 224) 0px 2px 8px 1px;
}
.canvas {
  border-radius: inherit;
  height: 100%;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 100%;
}
</style>
