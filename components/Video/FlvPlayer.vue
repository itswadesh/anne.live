<template>
  <div>
    <video
      id="videoElement"
      controls
      autoplay
      muted
      width="1100px"
      height="600px"
    ></video>
    <!-- <button @click="play">Play</button> -->
  </div>
</template>

<script>
export default {
  props: {
    src: { type: String, default: '' },
  },
  data() {
    return {
      flvPlayer: null,
    }
  },
  mounted() {
    const flv = require('flv.js')
    const flvjs = flv
    if (flvjs.isSupported() && process.client) {
      const videoElement = document.getElementById('videoElement')
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        url: this.src,
      })
      this.flvPlayer.attachMediaElement(videoElement)
      this.flvPlayer.load()
      this.flvPlayer.play()
    }
  },
  methods: {
    play() {
      this.flvPlayer.play()
    },
  },
}
</script>
