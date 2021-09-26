<template>
  <div class="w-full">
    <div v-if="chats" class="flex flex-col-reverse">
      <div v-for="c in chats.data" :key="c.id" :style="`color:#80c000`">
        {{ c.firstName }} - {{ c.message }}
      </div>
    </div>
    <div v-if="!user">Please login to send message</div>
    <form v-else class="flex mt-2 items-center" @submit.prevent="submit">
      <input
        v-model="message"
        type="text"
        placeholder="Send Message"
        class="py-1 text-white px-2 border border-gray-500 rounded bg-gray-500"
      />
      <AnimatedHeart />
    </form>
  </div>
</template>

<script>
import CHATS from '~/gql/im/chats.gql'
import AnimatedHeart from '~/components/AnimatedHeart.vue'
export default {
  components: {
    AnimatedHeart,
  },
  apollo: {
    $subscribe: {
      chats: {
        query: CHATS,
        variables() {
          return {
            channel: this.channel,
          }
        },
        result({ data }) {
          this.chats = data.chats
        },
      },
    },
  },
  props: {
    channel: { type: String, default: 'misiki' },
  },
  data() {
    return {
      chats: null,
      message: '',
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getDarkColor() {
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10)
      }
      return color
    },
    async getData() {
      try {
        this.chats = await this.$get('im/channelMessages', {
          channel: this.channel,
        })
      } catch (e) {}
    },
    async submit() {
      try {
        const chat = await this.$post('im/sendInstantMessage', {
          id: 'new',
          channel: this.channel,
          message: this.message,
        })
        this.message = ''
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
