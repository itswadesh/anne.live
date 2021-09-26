<template>
  <section class="text-gray-800">
    <div class="pt-10 text-3xl font-bold text-center text-green-500">
      Prime Video Call
    </div>
    <form
      novalidate
      autocomplete="off"
      class="container flex flex-wrap min-h-screen px-2 py-12 lg:mx-auto"
      @submit.stop.prevent="submit"
    >
      <div class="w-full mt-4 mb-auto lg:mt-0 lg:w-1/2 lg:ps-2 lg:pe-4">
        <div class="h-full pt-10 pb-20 bg-gray-300 rounded-lg shadow-lg">
          <div class="flex items-center justify-center space-x-5">
            <button
              class="
                flex
                items-center
                justify-center
                w-32
                py-1
                font-semibold
                tracking-wide
                bg-white
                rounded-md
                shadow-md
                hover:shadow
                focus:outline-none
              "
              @click="start"
            >
              <img
                src="https://img.icons8.com/color/30/000000/youtube-live.png"
              />
              <span class="ms-2">Publish</span>
            </button>
            <button
              class="
                flex
                items-center
                justify-center
                w-32
                py-1
                font-semibold
                tracking-wide
                bg-white
                rounded-md
                shadow-md
                hover:shadow
                focus:outline-none
              "
              @click="stop"
            >
              <img
                src="https://img.icons8.com/fluent/30/000000/stop-circled.png"
              />
              <span class="ms-2">Stop</span>
            </button>
            <button
              class="
                flex
                items-center
                justify-center
                w-32
                py-1
                font-semibold
                tracking-wide
                bg-white
                rounded-md
                shadow-md
                hover:shadow
                focus:outline-none
              "
              @click="leave"
            >
              <img
                src="https://img.icons8.com/emoji/30/000000/cross-mark-emoji.png"
              />
              <span class="ms-2">Destroy</span>
            </button>
          </div>

          <video
            autoplay
            muted
            :srcObject.prop="previewStream"
            width="500"
            height="500"
            class="p-0.5 mx-auto mt-5 bg-white border-2 border-gray-300 hw"
          />
          <div
            class="flex items-center mx-auto mt-2 space-x-2 text-xs max-w-max"
          >
            <div
              class="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"
            ></div>
            <span>00:00:00</span>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>
<script>
import moment from 'moment'
import { mapMutations } from 'vuex'
import { Modal, Button } from '~/shared/components/ui'

import CHANNEL from '~/gql/channel/channel.gql'
import SAVE_CHANNEL from '~/gql/channel/saveChannel.gql'
import PRODUCTS from '~/gql/product/products.gql'
import zego from '~/shared/mixins/zego'
export default {
  components: {
    Modal,
    Button,
  },
  mixins: [zego],
  data() {
    return {
      showModal: false,
      q: '',
      allProducts: [],
      live: {
        title: '',
        scheduleDateTime: moment(),
        products: [],
      },
    }
  },
  created() {
    this.getData()
    this.search('')
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      busy: 'busy',
    }),
    removeProductFromList(id) {
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', id)
      // this.live.products.pull(p.id)
    },
    async search(q) {
      try {
        this.clearErr()
        this.allProducts = await this.$get('product/products', { q })
        // this.allProducts =
        //   (
        //     await this.$apollo.query({
        //       query: PRODUCTS,
        //       variables: { q },
        //       fetchPolicy: 'no-cache',
        //     })
        //   ).data.products.data || []
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
    async submit() {
      const id = this.$route.params.id
      try {
        let products
        if (this.live.products) {
          products = this.live.products.map((a) => a.id)
        }
        this.clearErr()
        const live = await this.$post('channel/saveChannel', {
          id,
          title: this.live.title,
          img: this.live.img,
          scheduleDateTime: this.live.scheduleDateTime,
          products,
        })
        // const live = (
        //   await this.$apollo.mutate({
        //     mutation: SAVE_CHANNEL,
        //     variables: {
        //       id,
        //       title: this.live.title,
        //       img: this.live.img,
        //       scheduleDateTime: this.live.scheduleDateTime,
        //       products,
        //     },
        //   })
        // ).data.saveChannel
        if (id === 'new' || !id || id === undefined || id === 'undefined')
          this.$router.push(`/live/${live.id}`)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
    async getData() {
      this.loading = true
      const id = this.$route.params.id
      if (id === 'new' || !id || id === undefined || id === 'undefined') {
        this.live = { products: [] }
      } else {
        try {
          this.clearErr()
          this.live = (await this.$get('channel/channel', { id })) || {}
          // this.live =
          //   (
          //     await this.$apollo.query({
          //       query: CHANNEL,
          //       variables: { id },
          //       fetchPolicy: 'no-cache',
          //     })
          //   ).data.channel || {}
          this.live.scheduleDateTime = moment(
            this.live.scheduleDateTime
          ).format('YYYY-MM-DD hh:mm:ss a')
          if (this.live.images)
            this.live.images = this.live.images.map((o) => o.id)
        } catch (e) {
          this.setErr(e)
        } finally {
          this.loading = false
          this.busy(false)
        }
      }
    },
  },
}
</script>

<style scoped>
.margin {
  margin-bottom: -1px;
  margin-left: -0.5px;
}
.transitionstyle {
  transition: all;
  transition-duration: 0.3s;
}
</style>
