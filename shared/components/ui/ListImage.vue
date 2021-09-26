<template>
  <div
    class="mx-auto text-sm"
    :class="{ 'outer-small': size == 'small', outer: size !== 'small' }"
    :style="{ background: bgColor }"
  >
    <div class="inner">{{ firstLetter }}</div>
  </div>
</template>
<script>
export default {
  props: {
    text: { type: String, default: null },
    size: { type: String, default: null },
  },
  data: () => ({
    colors: [
      '#f58559',
      '#67bf74',
      '#59a2be',
      '#f9a43e',
      '#e4c62e',
      '#f16364',
      '#2093cd',
      '#ad62a7',
    ],
    bgColor: '',
    firstLetter: '',
    numberOfColors: 0,
  }),
  created() {
    this.numberOfColors = this.colors.length
    if (this.text) {
      const firstLetter = (this.firstLetter = this.text
        .toString()
        .charAt(0)
        .toUpperCase())
      this.bgColor = this.getColor(firstLetter)
    }
  },
  methods: {
    hashCode(str) {
      let hash = 0
      const length = str.length
      let i
      let chr

      if (length === 0) {
        return hash
      }

      for (i = 0; i < length; i++) {
        chr = str.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0 // Convert to 32bit integer
      }

      return hash
    },
    getColor(text) {
      const color =
        Math.abs(this.hashCode(text.charAt(0))) % this.numberOfColors
      return this.colors[color]
    },
  },
}
</script>
<style scoped>
.outer {
  border-radius: 50%;
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outer-small {
  border-radius: 50%;
  border: none;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner {
  color: #fff;
  font-weight: bold;
}
.outer-small .inner {
  color: #fff;
  font-weight: normal;
}
</style>
