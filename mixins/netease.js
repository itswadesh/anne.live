import * as WebRTC2 from '~/assets/js/netease/NIM_Web_WebRTC2_v4.3.0.js'
console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', WebRTC2)
const pushUser = {
  uid: null,
  x: null,
  y: null,
  width: 1280,
  height: 720,
  adaption: 1,
  pushAudio: true,
  pushVideo: true,
}

export default {
  data() {
    return {
      channel: null,
      isSilence: false,
      isStop: false,
      isDesc: false,
      isPushing: false,
      drawer: false,
      client: null,
      desc: null,
      localStream: null,
      remoteStreams: [],
      max: 4,
    }
  },
  methods: {
    // Step-3(B)
    async publish() {
      console.warn('Start publishing video stream')
      // Publish local media to the peer end of the room
      try {
        await this.client.publish(this.localStream)
        console.warn('Local publish successfully')
      } catch (err) {
        console.error('Local publish failed: ', err)
      }
    },
    setLiveMode() {
      this.client.setChannelProfile({ mode: 'live' })
    },
    async joinChannel(token, uid, channelName, isLive) {
      if (!this.client) {
        console.error('Internal error, please rejoin the room')
        return
      }
      const joinObj = {
        channelName,
        uid,
        token,
        // joinChannelLiveConfig: {
        //   liveEnable: true,
        // },
      }
      if (isLive) {
        joinObj.joinChannelLiveConfig = {
          liveEnable: true,
        }
      }
      console.warn('Start joining the room: ', joinObj)
      //   console.log('iiiiiiiiiiiiiiiiii', joinObj)
      try {
        await this.client.join(joinObj)
        console.warn(
          'Join the room successfully, start to initialize the local audio and video stream'
        )
        //   var channelInfo = this.client.getChannelInfo()
      } catch (error) {
        console.error('Failed to join the room：', error)
        console.error(
          `${error}: Please check if the appkey or token is correct`
        )
      }
    },
    // Step-3(A) Set the local view (Optional)
    async initLocalStream(uid) {
      this.localStream = WebRTC2.createStream({
        uid,
        audio: true,
        video: true,
        screen: false,
      })

      this.localStream.setVideoProfile({
        resolution: WebRTC2.VIDEO_QUALITY_720p,
        frameRate: WebRTC2.CHAT_VIDEO_FRAME_RATE_15,
      })
      this.localStream.setAudioProfile('speech_low_quality')
      try {
        await this.localStream.init()
        console.warn(
          'The audio and video have been turned on and can be played'
        )
        const div = self.$refs.large
        this.localStream.play(div)
        this.localStream.setLocalRenderMode({
          width: div.clientWidth,
          height: div.clientHeight,
          cut: true,
        })
      } catch (err) {
        console.warn('Audio and video initialization failed: ', err)
        console.error('Audio and video initialization failed')
        this.localStream = null
      }
    },
    subscribeToStreams() {
      // When another host comes online push that to CDN too
      this.client.on('peer-online', (evt) => {
        const uid = evt.uid
        console.warn(`${uid} Join room`)
        if (!this.rtmpTasks) return
        this.addRtmpTask(uid)
        this.updateRtmpTask()
      })

      this.client.on('peer-leave', (evt) => {
        console.warn(`${evt.uid} Leave the room`)
        // if (this.remoteStream.getId() === evt.uid) {
        //   this.remoteStream = null
        //   this.isDesc = true
        //   this.desc = 'The other party left the room'
        //   console.warn(this.desc)
        // }
        this.remoteStreams = this.remoteStreams.filter(
          (item) => !!item.getId() && item.getId() !== evt.uid
        )
        if (!this.rtmpTasks) return
        this.deleteRtmpTask(evt.uid)
        this.updateRtmpTask()
      })

      this.client.on('stream-added', async (evt) => {
        const stream = evt.stream
        const userId = stream.getId()
        if (this.remoteStreams.some((item) => item.getId() === userId)) {
          console.warn('收到已订阅的远端发布，需要更新', stream)
          this.remoteStreams = this.remoteStreams.map((item) =>
            item.getId() === userId ? stream : item
          )
          await this.subscribe(stream)
        } else if (this.remoteStreams.length < this.max - 1) {
          console.warn('收到新的远端发布消息', stream)
          this.remoteStreams = this.remoteStreams.concat(stream)
          await this.subscribe(stream)
        } else {
          console.warn('房间人数已满')
        }
      })

      //    this.client.on('stream-added', async (evt) => {
      //      const stream = evt.stream
      //      const userId = stream.getId()
      //      if (this.remoteStreams.some((item) => item.getId() === userId)) {
      //        console.warn(
      //          'Received a subscribed remote publication and needs to be updated',
      //          stream
      //        )
      //        this.remoteStreams = this.remoteStreams.map((item) =>
      //          item.getId() === userId ? stream : item
      //        )
      //        await this.subscribe(stream)
      //      } else if (this.remoteStreams.length < this.max - 1) {
      //        console.warn('Receive new remote publish message', stream)
      //        this.remoteStreams = this.remoteStreams.concat(stream)
      //        await this.subscribe(stream)
      //      } else {
      //        console.warn('The room is full')
      //      }
      //    })

      this.client.on('stream-removed', (evt) => {
        const stream = evt.stream
        const userId = stream.getId()
        stream.stop()
        this.remoteStreams = this.remoteStreams.map((item) =>
          item.getId() === userId ? stream : item
        )
        console.warn('The other party stops subscribing: ', userId)
      })

      // this.client.on('stream-removed', (evt) => {
      //   const stream = evt.stream
      //   const userId = stream.getId()
      //   stream.stop()
      //   this.remoteStreams = this.remoteStreams.map((item) =>
      //     item.getId() === userId ? stream : item
      //   )
      //   console.warn(
      //     'The remote stream stops subscribing and needs to be updated',
      //     userId,
      //     stream
      //   )
      // })

      this.client.on('stream-subscribed', (evt) => {
        console.warn('Received the opposite stream, ready to play')
        const remoteStream = evt.stream
        const div = [...this.$refs.small].find(
          (item) => Number(item.dataset.uid) === Number(remoteStream.getId())
        )
        this.isDesc = false
        remoteStream
          .play(div)
          .then(() => {
            console.warn('Play video')
            remoteStream.setRemoteRenderMode({
              width: 160,
              height: 90,
              cut: false,
            })
          })
          .catch((err) => {
            console.warn("Failed to play the other party's video:", err)
          })
      })

      //   this.client.on('stream-subscribed', (evt) => {
      //     console.warn('Received the opposite stream, ready to play')
      //     const remoteStream = evt.stream
      //     //  const div = [...this.$refs.small].find(
      //     //    (item) => Number(item.dataset.uid) === Number(remoteStream.getId())
      //     //  )
      //     this.isDesc = false
      //     const div = this.$refs.small
      //     remoteStream
      //       .play(div)
      //       .then(() => {
      //         console.warn('Play video')
      //         remoteStream.setRemoteRenderMode({
      //           width: 160,
      //           height: 90,
      //           cut: false,
      //         })
      //       })
      //       .catch((err) => {
      //         console.warn("Failed to play the other party's video:", err)
      //       })
      //   })

      this.client.on('rtmp-state', (data) => {
        console.warn(
          '===== zzzzzzzzzzzzzInteractive live broadcast status：',
          data
        )
        console.warn(
          `Interactive live streaming task：${data.task_id}，status：${data.state}`
        )
        if (data.state === 505) {
          console.warn(
            'The push task is in the process of pushing, and the status is normal'
          )
        } else if (data.state === 506) {
          console.warn('The push task failed to push the stream')
        } else if (data.state === 511) {
          console.warn('The push flow task is over')
        }
      })
    },
    handleOver() {
      if (!this.client) {
        return console.error('Internal error, please rejoin the room')
      }
      console.warn('Leave the room')
      this.client.leave()
    },
    subscribe(remoteStream) {
      remoteStream.setSubscribeConfig({
        audio: true,
        video: true,
      })
      this.client
        .subscribe(remoteStream)
        .then(() => {
          console.warn('Local subscribe succeeded')
        })
        .catch((err) => {
          console.warn('Local subscribe failed: ', err)
          console.error("Failed to subscribe to the other party's stream")
        })
    },
    setOrRelieveSilence() {
      const { isSilence } = this
      this.isSilence = !isSilence
      if (this.isSilence) {
        console.warn('Close mic')
        this.localStream
          .close({
            type: 'audio',
          })
          .then(() => {
            console.warn('Close mic success')
          })
          .catch((err) => {
            console.warn('Failed to close mic: ', err)
            console.error('Failed to close mic')
          })
      } else {
        console.warn('Open mic')
        if (!this.localStream) {
          console.error("Can't open mic currently")
          return
        }
        this.localStream
          .open({
            type: 'audio',
          })
          .then(() => {
            console.warn('Open mic success')
          })
          .catch((err) => {
            console.warn('Failed to open mic: ', err)
            console.error('Failed to open mic')
          })
      }
    },
    stopOrOpenVideo() {
      const { isStop } = this
      this.isStop = !isStop
      if (this.isStop) {
        console.warn('Turn off the camera')
        this.localStream
          .close({
            type: 'video',
          })
          .then(() => {
            console.warn('Turn off the camera sucess')
          })
          .catch((err) => {
            console.warn('Failed to turn off the camera: ', err)
            console.error('Failed to turn off the camera')
          })
      } else {
        console.warn('Turn on the camera')
        if (!this.localStream) {
          console.error("Can't open camera currently")
          return
        }
        this.localStream
          .open({
            type: 'video',
          })
          .then(() => {
            console.warn('Turn on the camera sucess')
            const div = self.$refs.large
            this.localStream.play(div)
            this.localStream.setLocalRenderMode({
              width: div.clientWidth,
              height: div.clientHeight,
              cut: true,
            })
          })
          .catch((err) => {
            console.warn('Failed to open camera: ', err)
            console.error('Failed to open camera')
          })
      }
    },
    async addTasks(rtmpTasks) {
      try {
        await this.client.addTasks({ rtmpTasks })
        this.isPushing = true
        console.error('Successfully added the push task interface')
      } catch (error) {
        console.warn('Failed to add push task interface: ', error)
        if (error === 'INVALID_PARAMETER') {
          console.error('Parameter error')
        }
      }
    },

    addRtmpTask(uid) {
      const length = this.rtmpTasks[0].layout.users.length
      if (length >= 2) return
      this.rtmpTasks[0].layout.users.push({
        ...pushUser,
        uid: Number(uid),
        x: length ? 550 : 0,
        y: 0,
      })
      console.warn(
        'zzzzzzzzzzzzzthis.rtmpTasks[0].layout.users.push successfull..........',
        this.rtmpTasks[0].layout
      )
    },
    deleteTasks(taskIds) {
      rtc.client
        .deleteTasks({
          taskIds,
        })
        .then(() => {
          console.warn('Successfully added the push task interface')
        })
        .catch((error) => {
          console.warn('Failed to add push task interface: ', error)
          if (error === 'INVALID_PARAMETER') {
            console.error('Parameter error')
          }
        })
    },
    deleteRtmpTask(uid) {
      if (!this.rtmpTasks) return // If its 1-1 video call
      const leftUsers = this.rtmpTasks[0].layout.users.filter(
        (item) => item.uid !== Number(uid)
      )
      leftUsers[0].x = 0
      this.rtmpTasks[0].layout.users = leftUsers
    },
    updateRtmpTask() {
      if (!this.rtmpTasks) return
      if (!this.isPushing) return
      if (!this.client) {
        throw new Error('Internal error, please rejoin the room')
      }
      //   console.warn(this.rtmpTasks)
      this.client
        .updateTasks({
          rtmpTasks: this.rtmpTasks,
        })
        .then(() => {
          console.warn('Open mic success')
        })
        .catch((err) => {
          console.warn('Failed to open mic: ', err)
          console.error('Failed to open mic')
        })
    },
    async togglePushStats() {
      if (!this.client) {
        return console.error('Internal error, please rejoin the room')
      }
      console.warn(this.rtmpTasks)
      if (this.isPushing) {
        try {
          await this.client.deleteTasks({
            taskIds: this.rtmpTasks.map((item) => item.taskId),
          })
          console.warn('Turn off the camera sucess')
          this.isPushing = false
        } catch (err) {
          console.warn('Failed to turn off the camera: ', err)
          console.error('Failed to turn off the camera')
        }
      } else {
        console.warn('Turn on the camera')
        if (!this.rtmpTasks) return
        if (!this.rtmpTasks[0].streamUrl) {
          console.warn("Can't open camera currently")
          return
        }
        this.addTasks(this.rtmpTasks)
      }
    },
    createClient(appkey) {
      this.client = WebRTC2.createClient({
        appkey,
        debug: true,
      })
    },
  },
  destroyed() {
    try {
      this.localStream.destroy()
      WebRTC2.destroy()
    } catch (e) {}
  },
}
