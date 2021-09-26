<template>
  <section v-if="videos" class="w-full p-5 md:p-10">
    <div
      v-if="videos && videos.data && videos.data.length"
      class="
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
        justify-items-center
      "
    >
      <div
        v-for="(v, vx) in videos.data"
        :key="vx.id"
        class="
          bg-white
          rounded-md
          p-2
          md:p-4
          hover:shadow
          shadow-md
          w-full
          max-w-xs
          flex-1
        "
      >
        <SingleVideoCard :video="v" />
      </div>
    </div>
    <!-- <div class="my-10 justify-center flex">
      <button class="font-medium hover:text-primary-500">Load More</button>
    </div> -->
    <Pagination
      class="mt-5"
      :count="noOfPages"
      :current="parseInt($route.query.page || 1)"
      @change="changePage"
    />
  </section>
</template>

<script>
import SingleVideoCard from '~/components/Video/SingleVideoCard.vue'
import VIDEOS from '~/gql/channel/videos.gql'
import { Pagination } from '~/shared/components/ui'

export default {
  components: {
    SingleVideoCard,
    Pagination,
  },
  data() {
    return {
      videos: null,
    }
  },
  computed: {
    noOfPages() {
      return Math.ceil(
        this.productCount /
          (this.$store.state.store && this.$store.state.store.pageSize)
      )
    },
  },
  async created() {
    const videos = await this.$get('channel/videos', {})
    this.videos = videos
    // const videos = await this.$apollo.query({
    //   query: VIDEOS,
    // })
    // this.videos = videos.data.videos
  },
  methods: {
    changePage(p) {
      const query = this.$route.query
      query.page = p
      query._ = new Date().getTime()
      this.scrollToTop()
      const url = constructURL('/', query)
      const cslug = this.$route.path.substr(1)
      this.$router.push(`/${cslug}${url}&page=${p}`)
    },
  },
}
</script>

<style></style>
