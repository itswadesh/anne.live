<template>
  <div :id="domId" ref="player" class="h-72 w-72"></div>
</template>

<script>
export default {
  props: ['stream', 'domId'],
  mounted() {
    this.$nextTick(function () {
      if (this.stream && !this.stream.isPlaying()) {
        this.stream.play(`${this.domId}`, { fit: 'cover' }, (err) => {
          if (err && err.status !== 'aborted') {
            console.warn('trigger autoplay policy')
          }
        })
      }
    })
  },
  beforeDestroy() {
    if (this.stream) {
      if (this.stream.isPlaying()) {
        this.stream.stop()
      }
      this.stream.close()
    }
  },
}
</script>
