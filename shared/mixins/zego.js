// const appID = 3268197896,
//   server = 'wss://webliveroom-hk-test.zegocloud.com/ws',
//   roomID = 'misiki',
//   token = `eyJ2ZXIiOjEsImhhc2giOiJjNDE4ZjU2YmQ2NjlhMzkxNDM3NWMzNjIxYWNhNDIzMSIsIm5vbmNlIjoiZjFhNGYzYWRkNzhlNDcyZjhkNzg2OThlOTdlMzA4OTUiLCJleHBpcmVkIjoxNjIzMTc0NDc2fQ==`,
//   userID = 'sample1620582469164',
//   userName = 'itswadesh'
// const streamID = "misiki";
// import ZEGO from '~/gql/channel/zego.gql'
const publishStreamID = 'web-' + new Date().getTime()

export default {
  data() {
    return {
      streamList: [],
      useLocalStreamList: [],
      zg: null,
      loginRoom: false,
      previewStream: null,
      isPreviewed: false,
      published: false,
      zego: null,
    }
  },
  methods: {
    async publish(roomID) {
      // let loginSuc = false
      try {
        // loginSuc = await this.enterRoom(roomID)
        // const constraints = {
        //   AEC: true,
        //   AGC: true,
        //   ANS: true,
        //   channelCount: 1,
        //   videoQuality: 1,
        // }
        // loginSuc &&
        await this.publishVideo()
      } catch (error) {
        // console.error(error)
      }
    },
    async stop() {
      try {
        await this.zg.stopPublishingStream(this.zego.streamID)
      } catch (e) {}
    },
    leave() {
      const zg = this.zg
      // if (this.previewed) {
      zg.destroyStream(this.previewStream)
      this.previewed = false
      //   // this.previewVideo.srcObject = null;
      // }
      // if (this.published) {
      zg.stopPublishingStream(publishStreamID)
      this.published = false
      // }

      this.logout()
    },

    logout() {
      const zg = this.zg
      // console.info('leave room  and close stream')
      this.previewStream = null

      // stop publishing
      if (this.isPreviewed) {
        zg.stopPublishingStream(publishStreamID)
        zg.destroyStream(this.localStream)
        this.isPreviewed = false
      }

      // stop playing
      for (let i = 0; i < this.useLocalStreamList.length; i++) {
        this.useLocalStreamList[i].streamID &&
          zg.stopPlayingStream(this.useLocalStreamList[i].streamID)
      }

      // Clear page
      this.useLocalStreamList = []
      zg.logoutRoom(this.zego.roomID)
      // loginRoom = false;
    },
    async destroy() {
      try {
        for (const s of this.streamList) {
          await this.zg.destroyStream(s.stream)
        }
      } catch (e) {
        // console.log('destroy...........', e)
      }
    },
    async publishVideo() {
      const zg = this.zg
      try {
        // create the stream
        this.localStream = this.previewStream = await zg.createStream()
        this.isPreviewed = true
        const publishStreamId = 'webrtc' + new Date().getTime()
        // const result = zg.startPublishingStream(
        //   publishStreamId,
        //   this.localStream
        // )
        this.published = true
      } catch (e) {
        // console.error('ERR::: ', e)
      }
    },

    listenForEvents() {
      const zg = this.zg
      zg.on('roomStateUpdate', (roomID, state, errorCode, extendedData) => {
        // console.log('roomStateUpdate: ', roomID, state, errorCode, extendedData)
      })
      zg.on('roomUserUpdate', (roomID, updateType, userList) => {
        console.warn(
          `roomUserUpdate: room ${roomID}, user ${
            updateType === 'ADD' ? 'added' : 'left'
          } `,
          JSON.stringify(userList)
        )
      })
      // zg.on('publisherStateUpdate', (result) => {
      //     // console.log('publisherStateUpdate: ', result.streamID, result.state)
      //     if (result.state === 'PUBLISHING') {
      //         console.info(' publish  success ' + result.streamID)
      //     } else if (result.state === 'PUBLISH_REQUESTING') {
      //         console.info(' publish  retry')
      //     } else {
      //         if (result.errorCode === 0) {
      //             console.warn('publish stop ' + result.errorCode)
      //         } else {
      //             console.error('publish error ' + result.errorCode)
      //         }
      //         // const _msg = stateInfo.error.msg;
      //         // if (stateInfo.error.msg.indexOf ('server session closed, reason: ') > -1) {
      //         //         const code = stateInfo.error.msg.replace ('server session closed, reason: ', '');
      //         //         if (code === '21') {
      //         //                 _msg = '音频编解码不支持(opus)';
      //         //         } else if (code === '22') {
      //         //                 _msg = '视频编解码不支持(H264)'
      //         //         } else if (code === '20') {
      //         //                 _msg = 'sdp 解释错误';
      //         //         }
      //         // }
      //         // alert('推流失败,reason = ' + _msg);
      //     }
      // })
      zg.on('playerStateUpdate', (result) => {
        // console.log('playerStateUpdate', result.streamID, result.state)
        if (result.state === 'PLAYING') {
          // console.info(' play  success ' + result.streamID)
          // const browser = getBrowser()
          // console.warn('browser', browser)
          if (browser === 'Safari') {
            // const videos = $(".remoteVideo video");
            // for (let i = 0; i < videos.length; i++) {
            //   videos[i].srcObject = videos[i].srcObject;
            // }
          }
        } else if (result.state === 'PLAY_REQUESTING') {
          // console.info(' play  retry')
        } else {
          // if (result.errorCode === 0) {
          //   // console.warn('play stop ' + result.errorCode)
          // } else {
          //   // console.error('play error ' + result.errorCode)
          // }
          // const _msg = stateInfo.error.msg;
          // if (stateInfo.error.msg.indexOf ('server session closed, reason: ') > -1) {
          //         const code = stateInfo.error.msg.replace ('server session closed, reason: ', '');
          //         if (code === '21') {
          //                 _msg = '音频编解码不支持(opus)';
          //         } else if (code === '22') {
          //                 _msg = '视频编解码不支持(H264)'
          //         } else if (code === '20') {
          //                 _msg = 'sdp 解释错误';
          //         }
          // }
          // alert('拉流失败,reason = ' + _msg);
        }
      })
      zg.on('streamExtraInfoUpdate', (roomID, streamList) => {
        console.warn(
          `streamExtraInfoUpdate: room ${roomID},  `,
          JSON.stringify(streamList)
        )
      })
      // const zg = this.zg
      zg.on(
        'roomStreamUpdate',
        (roomID, updateType, streamList, extendedData) => {
          console.error(
            'roomStreamUpdate 1 roomID ',
            roomID,
            streamList,
            extendedData
          )
          if (updateType === 'ADD') {
            for (let i = 0; i < streamList.length; i++) {
              console.info(streamList[i].streamID + ' was added')
              let remoteStream
              let playOption
              zg.startPlayingStream(streamList[i].streamID, playOption)
                .then((stream) => {
                  remoteStream = stream
                  this.useLocalStreamList.push({ stream: remoteStream })
                })
                .catch((err) => {
                  console.error('err', err)
                })
            }
          } else if (updateType === 'DELETE') {
            for (let k = 0; k < this.useLocalStreamList.length; k++) {
              for (let j = 0; j < streamList.length; j++) {
                if (
                  this.useLocalStreamList[k].streamID === streamList[j].streamID
                ) {
                  try {
                    zg.stopPlayingStream(this.useLocalStreamList[k].streamID)
                  } catch (error) {
                    console.error(error)
                  }

                  console.info(
                    this.useLocalStreamList[k].streamID + 'was devared'
                  )

                  // $(".remoteVideo video:eq(" + k + ")").remove();
                  this.useLocalStreamList.splice(k--, 1)
                  break
                }
              }
            }
          }
        }
      )
      zg.on('playQualityUpdate', async (streamID, streamQuality) => {
        // console.log(
        //     `play#${streamID} videoFPS: ${streamQuality.video.videoFPS} videoBitrate: ${streamQuality.video.videoBitrate} audioBitrate: ${streamQuality.audio.audioBitrate} audioFPS: ${streamQuality.audio.audioFPS}`
        // )
        // console.log(`play#${streamID}`, streamQuality)
      })

      zg.on('publishQualityUpdate', async (streamID, streamQuality) => {
        // console.log(
        //     `publish#${streamID} videoFPS: ${streamQuality.video.videoFPS} videoBitrate: ${streamQuality.video.videoBitrate} audioBitrate: ${streamQuality.audio.audioBitrate} audioFPS: ${streamQuality.audio.audioFPS}`
        // )
        // console.log(`publish#${streamID}`, streamQuality)
      })

      zg.on('remoteCameraStatusUpdate', (streamID, status) => {
        console.warn(
          `remoteCameraStatusUpdate ${streamID} camera status ${
            status === 'OPEN' ? 'open' : 'close'
          }`
        )
      })

      zg.on('remoteMicStatusUpdate', (streamID, status) => {
        console.warn(
          `remoteMicStatusUpdate ${streamID} micro status ${
            status === 'OPEN' ? 'open' : 'close'
          }`
        )
      })

      zg.on('soundLevelUpdate', (streamList) => {
        streamList.forEach((stream) => {
          stream.type === 'push' &&
            // $("#soundLevel").html(Math.round(stream.soundLevel) + "");
            console.warn(
              `${stream.type} ${stream.streamID}, soundLevel: ${stream.soundLevel}`
            )
        })
      })
      zg.on('deviceError', (errorCode, deviceName) => {
        console.warn(`deviceError`, errorCode, deviceName)
      })
      zg.on('videoDeviceStateChanged', (updateType, device) => {
        console.warn(`videoDeviceStateChanged`, device, updateType)
      })
      zg.on('audioDeviceStateChanged', (updateType, deviceType, device) => {
        console.warn(`audioDeviceStateChanged`, device, updateType, deviceType)
      })
      zg.on('roomOnlineUserCountUpdate', (roomID, count) => {
        console.warn(`roomOnlineUserCountUpdate ${roomID} ${count}`)
      })
    },
  },
  // async mounted() {
  //   this.zego =
  //     (
  //       await this.$apollo.query({
  //         query: ZEGO,
  //         fetchPolicy: 'no-cache',
  //       })
  //     ).data.zego || {}
  //   const ZegoExpressEngine =
  //     require('zego-express-engine-webrtc').ZegoExpressEngine
  //   const zg = (this.zg = new ZegoExpressEngine(
  //     this.zego.appID,
  //     this.zego.server
  //   ))

  //   zg.setLogConfig({
  //     logLevel: 'error',
  //     remoteLogLevel: 'info',
  //     logURL: '',
  //   })

  //   zg.setDebugVerbose(false)
  //   zg.setSoundLevelDelegate(true, 3000)
  // },
}
