<template>
  <div class="wrapper">
    <div class="content relative">
      <div ref="large" class="main-window"></div>
      <div class="absolute top-1 right-1">
        <template v-if="remoteStreams.length">
          <div
            v-for="item in remoteStreams"
            :key="item.getId()"
            ref="small"
            class="sub-window"
            :data-uid="item.getId()"
          ></div>
        </template>
        <div v-else ref="small" class="sub-window">
          <span class="loading-text">Waiting for others to join</span>
        </div>
      </div>
      <!-- <div class="sub-window" ref="small">
        <span class="loading-text" v-show="isDesc">{{ desc }}</span>
      </div> -->
    </div>
    <ul v-if="uid" class="absolute top-0 mt-32">
      <!-- <li
        :class="{ silence: true, isSilence }"
        @click="setOrRelieveSilence"
      ></li> -->
      <li v-if="!started" class="bg-red-500 text-white px-4 py-2 rounded">
        <button @click="start">Start</button>
      </li>
      <li v-if="started" class="bg-red-500 text-white px-4 py-2 rounded">
        <button @click="stop">Stop</button>
      </li>
      <!-- <li :class="{ stop: true, isStop }" @click="stopOrOpenVideo"></li> -->
    </ul>
  </div>
</template>
<script>
import NETEASE_TOKEN from '~/gql/channel/neteaseToken.gql'
import netease from '~/mixins/netease'

export default {
  mixins: [netease],
  middleware: ['isAuth'],
  data() {
    return {
      uid: null,
      started: false,
    }
  },
  async mounted() {
    console.warn('Initialize audio and video')
    const channel = this.$route.params.id
    const { appkey, uid, token } = (
      await this.$apollo.query({
        query: NETEASE_TOKEN,
        variables: { channel },
        fetchPolicy: 'no-cache',
      })
    ).data.neteaseToken
    this.uid = uid
    window.self = this
    await this.createClient(appkey) // Step-2
    await this.subscribeToStreams()
    await this.joinChannel(token, uid, channel)
    await this.initLocalStream(uid) // Step-3A
  },

  methods: {
    async start() {
      await this.publish() // Step-3(B)
      this.started = true
    },
    async stop() {
      await this.handleOver()
      this.started = false
      // this.$router.push('/')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.wrapper {
  height: 92vh;
  background-image: linear-gradient(179deg, #141417 0%, #181824 100%);
  display: flex;
  flex-direction: column;
}
.wrapper .content {
  flex: 1;
  position: relative;
}
.wrapper .content .main-window {
  height: 100%;
  width: 67vh;
  margin: 0 auto;
  background: #25252d;
}
.wrapper .content .sub-window {
  width: 165px;
  height: 95px;
  background: #25252d;
  z-index: 9;
  right: 16px;
  top: 16px;
  border: 1px solid #ffffff;
}
.wrapper .content .sub-window .loading-text {
  display: block;
  width: 100%;
  text-align: center;
  line-height: 90px;
  font-size: 12px;
  color: #fff;
  font-weight: 400;
}
.wrapper .tab-bar {
  height: 54px;
  background-image: linear-gradient(180deg, #292933 7%, #212129 100%);
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.wrapper .tab-bar li {
  height: 54px;
  width: 125px;
  cursor: pointer;
}
.wrapper .tab-bar li.silence {
  background: url('/live-icons/silence.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence:hover {
  background: url('/live-icons/silence-hover.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence:active {
  background: url('/live-icons/silence-click.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence.isSilence {
  background: url('/live-icons/relieve-silence.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence.isSilence:hover {
  background: url('/live-icons/relieve-silence-hover.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.silence.isSilence:active {
  background: url('/live-icons/relieve-silence-click.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.over {
  background: url('/live-icons/over.png') no-repeat center;
  background-size: 68px 36px;
}
.wrapper .tab-bar li.over:hover {
  background: url('/live-icons/over-hover.png') no-repeat center;
  background-size: 68px 36px;
}
.wrapper .tab-bar li.over:active {
  background: url('/live-icons/over-click.png') no-repeat center;
  background-size: 68px 36px;
}
.wrapper .tab-bar li.stop {
  background: url('/live-icons/stop.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop:hover {
  background: url('/live-icons/stop-hover.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop:active {
  background: url('/live-icons/stop-click.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop.isStop {
  background: url('/live-icons/open.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop.isStop:hover {
  background: url('/live-icons/open-hover.png') no-repeat center;
  background-size: 60px 54px;
}
.wrapper .tab-bar li.stop.isStop:active {
  background: url('/live-icons/open-click.png') no-repeat center;
  background-size: 60px 54px;
}
</style>
