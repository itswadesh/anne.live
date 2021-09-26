<template>
  <div>
    <!-- <FlvPlayer :src="$route.query.url" /> -->
    <video ref="video" width="100%" height="640" controls></video>
  </div>
</template>

<script>
// import CHANNEL from '~/gql/channel/channel.gql'
// import FlvPlayer from '~/components/Video/FlvPlayer'
import Hls from 'hls.js'
export default {
  components: {
    // FlvPlayer,
  },
  props: {
    src: { type: String, default: null },
  },
  data() {
    return {
      channel: null,
    }
  },
  mounted() {
    // const Hls = require('hls.js')
    // this.channel = await this.getChannelDetails()
    // if (!this.channel) return
    const hls = new Hls()
    console.warn('Play URL', this.src)
    const stream = this.src
    const video = this.$refs.video
    hls.loadSource(stream)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play()
    })
    hls.on(Hls.Events.ERROR, function (event, data) {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            console.log('fatal network error encountered, try to recover')
            hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('fatal media error encountered, try to recover')
            hls.recoverMediaError()
            break
          default:
            // cannot recover
            hls.destroy()
            break
        }
      }
    })
  },
  methods: {
    // async getChannelDetails() {
    //   try {
    //     const channel = (
    //       await this.$apollo.query({
    //         query: CHANNEL,
    //         variables: { id: this.$route.query.channelName },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.channel
    //     return channel
    //   } catch (e) {
    //     console.log('channel ERR::: ', e.toString())
    //     return null
    //   }
    // },
  },
}
</script>
